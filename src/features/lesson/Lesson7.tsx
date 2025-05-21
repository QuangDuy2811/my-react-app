// src/pages/Lesson7.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
  reorderTodos,
  moveTodoUp,
  moveTodoDown,
} from '../todos/todoSlice';


export default function Lesson7() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleDrag = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    const from = parseInt(e.dataTransfer.getData('index'));
    const newTodos = [...todos];
    const [moved] = newTodos.splice(from, 1);
    newTodos.splice(index, 0, moved);
    dispatch(reorderTodos(newTodos));
  };

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lesson 7 - Redux Todo App</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Enter todo..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Active Tasks */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Tasks</h3>
      <ul className="space-y-2">
        {activeTodos.map((todo, idx) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
            draggable
            onDragStart={e => handleDrag(e, idx)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, idx)}
          >
            {editId === todo.id ? (
              <input
                className="flex-1 border px-2"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onBlur={() => {
                  dispatch(updateTodo({ id: todo.id, text: editText }));
                  setEditId(null);
                }}
                autoFocus
              />
            ) : (
              <span className="flex-1">{todo.text}</span>
            )}
            <div className="flex gap-2 ml-2">
              <button
                className="border border-gray-400 text-gray-600 rounded px-2 py-1 text-sm hover:bg-gray-100 transition"
                onClick={() => dispatch(moveTodoUp(todo.id))}
                disabled={idx === 0}
                title="Move Up"
              >
                ↑
              </button>
              <button
                className="border border-gray-400 text-gray-600 rounded px-2 py-1 text-sm hover:bg-gray-100 transition"
                onClick={() => dispatch(moveTodoDown(todo.id))}
                disabled={idx === activeTodos.length - 1}
                title="Move Down"
              >
                ↓
              </button>
              <button
                className="border border-green-500 text-green-600 rounded px-2 py-1 text-sm hover:bg-green-100 transition"
                onClick={() => dispatch(toggleTodo(todo.id))}
                title="Mark as Done"
              >
                Done
              </button>
              <button
                className="border border-blue-500 text-blue-600 rounded px-2 py-1 text-sm hover:bg-blue-100 transition"
                onClick={() => {
                  setEditId(todo.id);
                  setEditText(todo.text);
                }}
                title="Edit"
              >
                Edit
              </button>
              <button
                className="border border-red-500 text-red-600 rounded px-2 py-1 text-sm hover:bg-red-100 transition"
                onClick={() => dispatch(deleteTodo(todo.id))}
                title="Delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-8 mb-2">Completed</h3>
          <ul className="space-y-2">
            {completedTodos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 border rounded bg-gray-100 text-gray-500"
              >
                <span className="flex-1 line-through">{todo.text}</span>
                <div className="flex gap-2 ml-2">
                  <button
                    className="border border-yellow-500 text-yellow-600 rounded px-3 py-1 text-sm hover:bg-yellow-100 transition"
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    Undo
                  </button>
                  <button
                    className="border border-red-500 text-red-600 rounded px-3 py-1 text-sm hover:bg-red-100 transition"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
