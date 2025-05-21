import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    updateTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) todo.text = action.payload.text;
    },
    reorderTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    moveTodoUp(state, action: PayloadAction<string>) {
      const index = state.todos.findIndex(t => t.id === action.payload);
      if (index > 0) {
        [state.todos[index - 1], state.todos[index]] = [state.todos[index], state.todos[index - 1]];
      }
    },
    moveTodoDown(state, action: PayloadAction<string>) {
      const index = state.todos.findIndex(t => t.id === action.payload);
      if (index < state.todos.length - 1) {
        [state.todos[index + 1], state.todos[index]] = [state.todos[index], state.todos[index + 1]];
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
  reorderTodos,
  moveTodoUp,
  moveTodoDown,
} = todoSlice.actions;

export default todoSlice.reducer;

