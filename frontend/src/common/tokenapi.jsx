/***** 토큰 Getter/Setter *****/
export const getAccessToken = () => {
  return window.localStorage.getItem("accessToken");
};
export const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken");
};
export const getTokens = () => {
  return {
    accessToken: window.localStorage.getItem("accessToken"),
    refreshToken: window.localStorage.getItem("refreshToken"),
  };
};
export const setTokens = (accessToken, refreshToken) => {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
};
export const clearTokens = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
};
