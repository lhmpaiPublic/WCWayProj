import { createSlice } from "@reduxjs/toolkit";

// 2. 초기 상태
const initialState = {
  greeting: "",
  theme: "light",
};

// 3. Slice 생성
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGreeting: (state, action) => {
      state.greeting = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// 4. 액션과 리듀서 내보내기
export const { setGreeting, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
