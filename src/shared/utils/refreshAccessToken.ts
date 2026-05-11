import type { AppDispatch } from '../../redux/app/store';
import { setUser, setLogout } from '../../redux/features/auth/authSlice';
import type { LoginResponse } from '../../redux/features/auth/authTypes';
import { simpleBaseQuery } from './allBaseQueries';

export const refreshAccessToken = async (
  dispatch: AppDispatch,
  community_admin_id: string,
): Promise<{
  data: LoginResponse | null;
}> => {
  try {
    const result = await simpleBaseQuery(
      {
        url: `/community/refresh_token/${community_admin_id}`,
        method: 'POST',
      },
      {
        signal: new AbortController().signal,
        abort: () => {},
        dispatch,
        getState: () => {},
        extra: {},
        endpoint: '',
        type: 'query',
      },
      {},
    );

    const data = result.data as LoginResponse;

    if (data.token) {
      dispatch(
        setUser({
          data: data.data,
          token: data.token,
        }),
      );
      return { data };
    } else {
      console.warn('[refreshAccessToken] No token in response');
      dispatch(setLogout());
      return { data: null };
    }
  } catch (err) {
    console.error('[refreshAccessToken] Network/server error', err);
    dispatch(setLogout());
    return { data: null };
  }
};
