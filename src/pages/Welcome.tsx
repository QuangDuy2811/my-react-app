import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-6xl pb-3"><h1>Welcome</h1></div>
      <button
        className="hover:text-blue-500"
        onClick={() => navigate('/lesson')}
      >
        👉 Go to lesson list
      </button>
    </div>
  );
};

export default Welcome;
