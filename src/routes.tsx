import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

import Layout from './components/Layout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ForgotPassword from './features/auth/ForgotPassword';
import Welcome from './pages/Welcome';
import Lesson from './pages/Lesson';
import Lesson1 from './features/lesson/Lesson1';
import Lesson2 from './features/lesson/Lesson2';
import Lesson3 from './features/lesson/Lesson3';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Routes>
      {/* Không cho vào login nếu đã đăng nhập */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/welcome" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/welcome" replace />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={
          isLoggedIn ? (
            <Navigate to="/welcome" replace />
          ) : (
            <ForgotPassword />
          )
        }
      />

      {/* Protected routes */}
      {isLoggedIn ? (
        <>
          <Route path="/welcome" element={<Welcome />} />
          <Route element={<Layout />}>
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/lesson/1" element={<Lesson1 />} />
            <Route path="/lesson/2" element={<Lesson2 />} />
            <Route path="/lesson/3" element={<Lesson3 />} />
          </Route>
        </>
      ) : (
        // Redirect mọi thứ về /login nếu chưa login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
