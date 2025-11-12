import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { refreshAccessToken } from './refreshAccessToken';
import { setLogout } from '../../redux/features/auth/authSlice';
import UserStorage from './userStorage';
import { baseQuery } from './allBaseQueries';

// Wrapper for handling token refresh
export const baseQueryWithRefreshAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If access token is expired (403 Unauthorized), attempt refresh
  if (result.error && result.error.status === 403) {
    const community_admin_id = UserStorage.getCommunityAdminId();
    if (!community_admin_id) {
      // api.dispatch(setLogout());
      return result;
    }

    const refresh = await refreshAccessToken(api.dispatch, community_admin_id);

    if (refresh.data?.token) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn('[baseQueryWithReauth] Refresh failed, logging out');
      api.dispatch(setLogout());
    }
  }

  return result;
};
