import { useDispatch } from "react-redux";
import { selectLesson } from "../features/lesson/lessonSlice";
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from "../app/store";
const Lesson = () => {
  const lessons = Array.from({ length: 8 }, (_, i) => i + 1);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="grid grid-cols-3 gap-10 items-center m-8">
      {lessons.map((num) => (
        <div
          key={num}
          onClick={() => {
                dispatch(selectLesson(num - 1)); // cập nhật lesson đang chọn
                navigate(`/lesson/${num}`);
              }}
          className="bg-slate-400 hover:bg-slate-200 p-8 rounded cursor-pointer flex "
        >
          <button>Lesson {num}</button>
        </div>
      ))}
    </div>
  );
};

export default Lesson;
