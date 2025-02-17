import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  quizId: number | null;
}

const initialState: QuizState = {
  quizId: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizId: (state, action: PayloadAction<number>) => {
      state.quizId = action.payload;
    },
  },
});

export const { setQuizId } = quizSlice.actions;
export default quizSlice.reducer;
