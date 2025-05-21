import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { selectLesson } from "../features/lesson/lessonSlice";
import type { RootState, AppDispatch } from "../app/store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectedLesson = useSelector((state: RootState) => state.lesson.selectedLesson);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true }); // Không cho quay lại
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header nằm ở trên */}
      <header className="flex justify-between p-2 border text-center items-center">
        <div className='pl-8'>
          <button 
            className='p-2 hover:bg-gray-100 rounded-md'
            onClick={() => {
              dispatch(selectLesson(null)); 
              navigate(`/lesson`);
            }} 
            >All lesson</button>
        </div>
        <div className='font-bold'><h1>Bài thực hành react( ts required)</h1></div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Nội dung chính gồm sidebar và main cùng hàng */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex flex-col w-40 bg-gray-50 p-4 border">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                dispatch(selectLesson(i));// cập nhật lesson đang chọn
                navigate(`/lesson/${i + 1}`);
              }}
              className={`font-semibold p-2 mb-2 hover:bg-gray-100 rounded-md ${
                selectedLesson === i ? "bg-green-500" : ""
              }`}
            >
              Lesson {i + 1}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 border overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
