import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

import Layout from './components/Layout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ForgotPassword from './features/auth/ForgotPassword';
import Welcome from './pages/Welcome';
import Lesson from './pages/Lesson';
import ExerciseDetail from './pages/ExerciseDetail';

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
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
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
