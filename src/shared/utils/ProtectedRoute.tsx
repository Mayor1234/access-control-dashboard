import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/app/store';
// import Spinners from '../../components/spinnners/Spinners';

const ProtectedRoute = () => {
  const { isAuthReady } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return isAuthReady ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
