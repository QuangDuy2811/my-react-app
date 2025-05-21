import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import lessonReducer from '../features/lesson/lessonSlice'
import todoReducer from '../features/todos/todoSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    todo: todoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
