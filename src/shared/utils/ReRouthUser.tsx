import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hook';
import type { RootState } from '../../redux/app/store';

const ReRouthUser = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);

  return token ? <Navigate to="/dashboard" replace={true} /> : <Outlet />;
};

export default ReRouthUser;
