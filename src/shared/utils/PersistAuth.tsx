import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { refreshAccessToken } from './refreshAccessToken';
import { setUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import Spinners from '../../components/spinnners/Spinners';
import UserStorage from './userStorage';
// import { tokenManager } from './tokenManager';

// This function verify and refresh the access token
// This function will be called if the token is not present
// or if it has expired
// It will dispatch the action to refresh the token and update the state
// Note: The refreshAccessToken function should handle the API call
// and return the new access token
// If the token is not present, we will call the refreshAccessToken function
// and update the state with the new token
// If the token is present, we will set isLoading to false
// and render the Outlet component
// If the refreshAccessToken function fails, we will log the error
// and set isLoading to false
// If the community_admin_id is not present, we can set isLoading to false
// and return early to avoid unnecessary API calls

export const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  console.log('[PersistAuth] Current Redux token:', token ? 'exists' : 'null');

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        console.log(
          '[PersistAuth] Token found in TokenManager, no refresh needed'
        );
        setIsLoading(false);
        return;
      }

      // STEP 1: If no community_admin_id found, return
      const community_admin_id = UserStorage.getCommunityAdminId();

      if (!community_admin_id) {
        console.log(
          '[PersistAuth] No community_admin_id found, skipping refresh'
        );
        setIsLoading(false);
        return;
      }

      // STEP 2: If no token found, refresh token and dispatch new access token
      try {
        const result = await refreshAccessToken(dispatch, community_admin_id);

        if (result.data) {
          dispatch(
            setUser({
              data: result.data.data,
              token: result.data.token,
            })
          );
        } else {
          console.log('[PersistAuth] Token refresh failed');
        }
      } catch (error) {
        console.error('[PersistAuth] Refresh error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch, token]); // Remove 'token' from dependencies to avoid infinite loops

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinners variant="default" size="xl" color="primary" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
