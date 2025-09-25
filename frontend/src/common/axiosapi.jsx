/**
 * axios -> rs : { config, headers, ... error, data }
 * rs.data -> { success: "OK" | "FAIL", data?: {}, err?: {} }
 *
 * 1. api 공통 파라메터 생성
 * 2. 토큰 저장/가져오는 함수(LocalStorage)
 * 3. interceptors.request 토큰 탑재
 * 4. interceptors.response 401처리(동시요청처리)
 * 5. Token갱신 및 지연요청 송신
 */
import axios, {
  AxiosError,
  AxiosHeaders,
} from "axios";
import {
  clearTokens,
  getRefreshToken,
  setTokens,
  getAccessToken,
} from "./tokenapi";


/***** 전역상수 *****/
export const BASE_URL = import.meta.env?.VITE_EXPRESS_API || "";
export const REFRESH_URL = import.meta.env?.VITE_REFRESH_API || "";
export const TIMEOUT = Number(import.meta.env?.VITE_TIMEOUT_API) || 0;

/***** 전역변수 *****/
let promiseQueue = [];
let isUpdatingToken = false;

const instance = axios.create({
  baseURL: 'https://your.api.url',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/***** Token 갱신 API *****/
// 401이 리턴되면 refreshToken을 실어서 API요청을 보내고, 응답받은 토큰을 저장
export const retrieveToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    window.dispatchEvent(
      new CustomEvent("ERROR_API", {
        detail: { cod: 403, msg: "리플래시 토큰 오류" },
      })
    );
  } else {
    const rs = await apiPost("/public/refresh", { refreshToken });
    if (rs?.success === "OK") {
      setTokens(rs?.data?.accessToken || "", rs?.data?.refreshToken || "");
      return true;
    }
  }
  return false;
};


// 타입 가드: ApiErrorBase 판별
const isApiError = (x) => {
  return (
    typeof x === "object" &&
    x !== null &&
    "msg" in x &&
    "cod" in x &&
    typeof (x).msg === "string" &&
    typeof (x).cod === "number"
  );
};

// 에러 status 추출
const getErrorStatus = (err) => {
  if (axios.isAxiosError(err)) {
    return err.response?.status ?? (err).status;
  }
  if (typeof (err)?.status === "number") {
    return (err).status;
  }
  return undefined;
};

instance.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const isPublic = url.toLowerCase().includes("/public");

    console.log(url);

    // Normalize headers once
    const headers = (() => {
      if (config.headers) return config.headers;
      const h = new AxiosHeaders();
      const base = (config.headers ?? {});
      for (const [k, v] of Object.entries(base)) {
        if (typeof v !== "undefined") h.set(k, v );
      }
      return h;
    })();

    if (!isPublic) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        // withCredentials는 headers가 아닌 최상위 옵션
        config.withCredentials = true;
      }
    }

    // Content-Type: only set if not present
    if (!headers.has("Content-Type")) {
      const isFormData =
        typeof FormData !== "undefined" && config.data instanceof FormData;
      headers.set(
        "Content-Type",
        isFormData ? "multipart/form-data" : "application/json"
      );
    }

    config.headers = headers;
    return config;
  },
  (err) => {
    window.dispatchEvent(
      new CustomEvent("ERROR_API", {
        detail: { cod: 403, msg: "API 요청 오류", err },
      })
    );
    return Promise.reject(null);
  }
);

/***** Axios Response 콜백 *****/
instance.interceptors.response.use(
  (response) => {
    const payload = response?.data;
    // 서버가 err 또는 error로 내려줄 수 있음 (error는 unknown이므로 가드 필요)
    const errFromErrorField = isApiError(payload?.error)
      ? payload?.error
      : undefined;
    const bizErr = payload?.err ?? errFromErrorField;
    if (payload?.success === "FAIL" && bizErr) {
      // 비지니스에러
      const { cod, msg, data } = bizErr;
      window.dispatchEvent(
        new CustomEvent("ERROR_BIZ", {
          detail: { cod, msg, data },
        })
      );
      // 인터셉터의 반환 타입(AxiosResponse)을 유지하되 데이터만 null 처리
      const res = response;
      res.data = {
        success: payload.success,
        data: null,
        err: bizErr,
      };
      return res;
    }
    return response;
  },
  async (error) => {
    const status = getErrorStatus(error);
    if (status === 401) {
      const cfg = error.config;
      const isCfgPublic =
        typeof cfg?.url === "string" &&
        cfg.url.toLowerCase().includes("/public");
      if (cfg && !isCfgPublic) {
        promiseQueue.push(cfg);
      }
      if (!isUpdatingToken) {
        console.log("===== 리플래시 토큰 갱신 요청 =====");
        isUpdatingToken = true;
        try {
          const ok = await retrieveToken();
          const queued = promiseQueue.splice(0);
          if (ok) {
            queued.forEach((c) => instance(c));
          } else {
            // 토큰 갱신 실패: 큐 정리 및 알림
            window.dispatchEvent(
              new CustomEvent("ERROR_API", {
                detail: {
                  cod: 401,
                  msg: "인증이 만료되었습니다. 다시 로그인 해주세요.",
                },
              })
            );
          }
        } finally {
          isUpdatingToken = false;
        }
      }
    } else {
      // 공통 에러 처리 500등
      console.log(error);
      const errPayload = error?.response?.data;
      const bizErr =
        errPayload?.err ??
        (isApiError(errPayload?.error) ? errPayload?.error : undefined);
      window.dispatchEvent(
        new CustomEvent("ERROR_API", {
          detail: { cod: bizErr?.cod, msg: bizErr?.msg, data: bizErr?.data },
        })
      );
    }
    return Promise.reject(null);
  }
);

/***** 공통 호출 함수 *****/
// data: post, params: get
export const api = async (
  url,
  params,
  config
) => {
  const reqConfig= {
    ...(config),
    params,
  };
  const response = await instance.get<ApiResponse<D>>(url, reqConfig);
  return response?.data || null;
};

export const apiPost = async(
  url,
  data,
  config
) => {
  const response = await instance.post(url, data, config);
  return response?.data || null;
};

export const apiFile = async (
  url,
  data,
  config
) => {
  // 파일 업로드는 FormData 사용을 권장합니다. 요청 인터셉터가 FormData를 감지해 Content-Type을 설정합니다.
  const response = await instance.post(url, data, config);
  return response?.data || null;
};

export { instance };
