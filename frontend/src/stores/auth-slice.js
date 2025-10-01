import { createSlice } from "@reduxjs/toolkit";

// 3. 초기 상태
const initialState = {
  isLogging: false,
  isLogOn: false,
  user: {},
  error: null,
  isLocalLogging: false,
  isLocalLogOn: false,
  localUser: {},
  localError: null,
};

// 4. Slice 정의
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOn: (state, action) => {
      state.isLogging = false;
      state.isLogOn = action.payload.isLogOn;
      state.user = action.payload.user;
      state.error = null;
    },
    logOut: (state) => {
      state.isLogging = false;
      state.isLogOn = false;
      state.user = {};
      state.error = null;
    },
    localLogOn: (state, action) => {
      state.isLocalLogging = false;
      state.isLocalLogOn = true;
      state.localUser = action.payload;
      state.localError = null;
    },
    localLogOut: (state) => {
      state.isLocalLogging = false;
      state.isLocalLogOn = false;
      state.localUser = {};
      state.localError = null;
    },
  },
});

// 5. 액션과 리듀서 내보내기
export const { logOn, logOut, localLogOn, localLogOut } = authSlice.actions;
export default authSlice.reducer;
