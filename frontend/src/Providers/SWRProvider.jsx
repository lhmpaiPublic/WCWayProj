/**
suspense = false: React Suspense 모드를 활성화 (상세내용)
fetcher(args): fetcher 함수
revalidateIfStale = true: 오래된 데이터가 있더라도 자동으로 다시 확인 (상세내용)
revalidateOnMount: 컴포넌트가 마운트되었을 때 자동 갱신 활성화 또는 비활성화 (details)
revalidateOnFocus = true: 창이 포커싱되었을 때 자동 갱신 (상세내용)
revalidateOnReconnect = true: 브라우저가 네트워크 연결을 다시 얻었을 때 자동으로 갱신(navigator.onLine을 통해) (상세내용)
refreshInterval (상세내용):
기본적으로는 비활성화: refreshInterval = 0
number로 설정된 경우, 폴링 인터벌(밀리초)
function으로 설정된 경우, 함수가 최신 데이터를 받고 인터벌 반환(밀리초)
refreshWhenHidden = false: 창이 보이지 않을 때 폴링(refreshInterval이 활성화된 경우)
refreshWhenOffline = false: 브라우저가 오프라인일 때 폴링(navigator.onLine에 의해 결정됨)
shouldRetryOnError = true: fetcher에 에러가 있을 때 재시도
dedupingInterval = 2000: 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거(밀리초)
focusThrottleInterval = 5000: 이 시간 범위 동안 단 한 번만 갱신(밀리초)
loadingTimeout = 3000: onLoadingSlow 이벤트를 트리거 하기 위한 타임아웃(밀리초)
errorRetryInterval = 5000: 에러 재시도 인터벌(밀리초)
errorRetryCount: 최대 에러 재시도 수
fallback: 다중 폴백 데이터의 키-값 객체 (예시)
fallbackData: 반환될 초기 데이터(노트: hook 별로 존재)
keepPreviousData = false: 새 데이터가 로드될 때까지 이전 키의 데이터를 반환 (상세내용)
onLoadingSlow(key, config): 요청을 로드하는 데 너무 오래 걸리는 경우의 콜백 함수(loadingTimeout을 보세요)
onSuccess(data, key, config): 요청이 성공적으로 종료되었을 경우의 콜백 함수
onError(err, key, config): 요청이 에러를 반환했을 경우의 콜백 함수
onErrorRetry(err, key, config, revalidate, revalidateOps): 에러 재시도 핸들러
onDiscarded(key): 경합 상태(race condition)로 인해 요청이 무시될 경우 실행되는 콜백 함수
compare(a, b): 비논리적인 리렌더러를 회피하기 위해 반환된 데이터가 변경되었는지를 감지하는데 사용하는 비교 함수. 기본적으로 stable-hash(opens in a new tab)을 사용합니다.
isPaused(): 갱신의 중지 여부를 감지하는 함수. true가 반환될 경우 가져온 데이터와 에러는 무시합니다. 기본적으로는 false를 반환합니다.
use: 미들웨어 함수의 배열 (상세내용)
 */
import { api, apiPost } from "../common/axiosapi"

// fetcher 함수 타입
export const expressFetcher = (url, params) => {
  return api(url, params ).then((response) => response?.data );
};

export const expressPostFetcher = (url, params)=> {
  return apiPost(url, params).then((response) => response?.data );
};

export const swrValue = {
  // suspense: false,
  // React Suspense 모드를 활성화할지 여부. true로 설정하면 SWR이 Suspense를 사용하여 데이터를 페칭하는 동안 컴포넌트를 일시 중단(suspend)함.
  // false로 설정하면 Suspense를 사용하지 않고 일반적인 로딩 상태를 처리함.
  suspense: false,

  // fetcher: expressFetcher,
  // 데이터를 가져오는 함수. SWR이 데이터를 요청할 때 사용할 커스텀 페처(fetcher) 함수를 지정.
  // 예: expressFetcher는 Express 서버에서 데이터를 가져오는 로직을 포함할 수 있음.
  fetcher: expressFetcher,

  // revalidateIfStale: false,
  // 캐시된 데이터가 'stale'(오래된) 상태일 때 자동으로 재검증(revalidate)을 수행할지 여부.
  // false로 설정하면 오래된 데이터가 있어도 즉시 재검증하지 않고 캐시 데이터를 반환.
  revalidateIfStale: false,

  // revalidateOnMount: true,
  // 컴포넌트가 마운트될 때 데이터를 자동으로 재검증할지 여부.
  // true로 설정하면 컴포넌트가 마운트될 때 항상 데이터를 새로 가져옴.
  revalidateOnMount: true,

  // revalidateOnFocus: true,
  // 브라우저 창이 포커스를 얻을 때(예: 탭 전환 후 돌아옴) 데이터를 재검증할지 여부.
  // true로 설정하면 창에 포커스가 돌아올 때 데이터를 새로 고침.
  revalidateOnFocus: true,

  // revalidateOnReconnect: true,
  // 네트워크가 다시 연결될 때(오프라인에서 온라인으로 전환) 데이터를 재검증할지 여부.
  // true로 설정하면 네트워크 재연결 시 데이터를 새로 가져옴.
  revalidateOnReconnect: true,

  // refreshInterval: 0,
  // 데이터를 주기적으로 새로 고침하는 간격(밀리초 단위).
  // 0으로 설정하면 주기적인 새로 고침(polling)을 비활성화.
  refreshInterval: 0,

  // refreshWhenHidden: false,
  // 브라우저 탭이 비활성 상태(숨겨짐)일 때 데이터를 새로 고칠지 여부.
  // false로 설정하면 탭이 숨겨져 있을 때는 새로 고침을 수행하지 않음.
  refreshWhenHidden: false,

  // refreshWhenOffline: false,
  // 오프라인 상태일 때 데이터를 새로 고칠지 여부.
  // false로 설정하면 오프라인 상태에서는 새로 고침을 시도하지 않음.
  refreshWhenOffline: false,

  // shouldRetryOnError: false,
  // 데이터 페칭 중 에러가 발생했을 때 자동으로 재시도할지 여부.
  // false로 설정하면 에러 발생 시 재시도를 하지 않음.
  shouldRetryOnError: false,

  // dedupingInterval: 2000,
  // 동일한 키로 요청된 데이터 페칭을 중복 제거(deduplicate)하는 시간 간격(밀리초 단위).
  // 2000ms 동안 동일한 키의 요청은 하나로 합쳐져 단일 요청만 실행됨.
  dedupingInterval: 2000,

  // focusThrottleInterval: 5000,
  // 포커스 이벤트에 의한 재검증의 최소 간격(밀리초 단위).
  // 5000ms 동안 포커스 이벤트가 여러 번 발생해도 한 번만 재검증을 수행.
  focusThrottleInterval: 5000,

  // loadingTimeout: 3000,
  // 데이터 페칭이 느리다고 판단하는 시간(밀리초 단위). 이 시간을 초과하면 onLoadingSlow 콜백이 호출됨.
  // 3000ms로 설정하면 3초 이상 걸릴 경우 느린 로딩으로 간주.
  loadingTimeout: 3000,

  // errorRetryInterval: 5000,
  // 에러 발생 후 재시도 간격(밀리초 단위).
  // 현재 shouldRetryOnError가 false이므로 이 설정은 사용되지 않음.
  errorRetryInterval: 5000,

  // errorRetryCount: 0,
  // 에러 발생 시 최대 재시도 횟수.
  // 0으로 설정하면 재시도를 하지 않음(shouldRetryOnError가 false인 경우와 일치).
  errorRetryCount: 0,

  // keepPreviousData: true,
  // 새로운 데이터를 페칭하는 동안 이전 데이터를 유지할지 여부.
  // true로 설정하면 새 데이터가 로드될 때까지 이전 데이터를 계속 표시함(데이터 깜빡임 방지).
  keepPreviousData: true,

  // onLoadingSlow: (key, config) => {},
  // 데이터 페칭이 loadingTimeout 이상 걸릴 때 호출되는 콜백 함수.
  // key: 요청된 데이터의 키, config: SWR 설정 객체.
  // 현재는 빈 함수로 정의되어 아무 동작도 하지 않음.
 // 콜백 함수들 - 타입 제공
  onLoadingSlow: (key, config) => {
    // console.warn("Loading slow", key);
    if(key) config
  },

  // onSuccess: (data, key, config) => {},
  // 데이터 페칭이 성공적으로 완료되었을 때 호출되는 콜백 함수.
  // data: 페칭된 데이터, key: 요청된 키, config: SWR 설정 객체.
  // 현재는 빈 함수로 정의되어 아무 동작도 하지 않음.
 onSuccess: (data, key, config) => {
    // console.log("Data loaded", data);
    data
    key
    config
  },

  // onError: (err, key, config) => {
  //   console.log(err, key, config)
  // },
  // 데이터 페칭 중 에러가 발생했을 때 호출되는 콜백 함수.
  // err: 발생한 에러 객체, key: 요청된 키, config: SWR 설정 객체.
  // 현재는 에러, 키, 설정을 콘솔에 출력하도록 정의됨.
 onError: (err, key, config) => {
    // console.error("Error", err);
    err
    key
    config
  },

  // onErrorRetry: (err, key, config, revalidate, revalidateOps) => {},
  // 에러 발생 후 재시도 로직을 커스터마이징하는 콜백 함수.
  // err: 에러 객체, key: 요청된 키, config: SWR 설정 객체, revalidate: 재검증 함수, revalidateOps: 재검증 옵션.
  // 현재는 빈 함수로 정의되어 기본 재시도 로직을 따름.
  onErrorRetry: (
    err,
    key,
    config,
    revalidate,
    opts
  ) => {
    // 재시도 로직 비활성화
    err
    key
    config
    revalidate
    opts
  },

  // onDiscarded: (key) => {},
  // 캐시된 데이터가 폐기(discarded)될 때 호출되는 콜백 함수.
  // key: 폐기된 데이터의 키.
  // 현재는 빈 함수로 정의되어 아무 동작도 하지 않음.
  onDiscarded: () => {},

  // compare: (a, b) => true,
  // 캐시된 데이터와 새 데이터를 비교하는 함수. 반환값이 true면 데이터가 동일하다고 판단.
  // 주석 처리되어 기본 비교 로직을 사용함.
  // compare: (a, b) => true,

  // isPaused: () => false,
  // 데이터 페칭을 일시 중지할지 여부를 결정하는 함수.
  // false를 반환하면 페칭이 일시 중지되지 않음. 주석 처리되어 기본 동작을 따름.
  // isPaused: () => false,
}
