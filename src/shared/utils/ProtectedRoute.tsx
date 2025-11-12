import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/app/store';
// import Spinners from '../../components/spinnners/Spinners';

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // // Wait until token state is determined (from PersistAuth)
  // if (isAuthReady) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <Spinners variant="default" size="xl" color="primary" />
  //     </div>
  //   );
  // }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
