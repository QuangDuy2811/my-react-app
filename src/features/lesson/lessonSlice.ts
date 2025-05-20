// src/features/lesson/lessonSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface LessonState {
  selectedLesson: number | null;
}

const initialState: LessonState = {
  selectedLesson: null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    selectLesson: (state, action: PayloadAction<number | null>) => {
      state.selectedLesson = action.payload;
    },
  },
});

export const { selectLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
