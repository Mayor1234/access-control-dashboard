import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefreshAuth } from '../../../shared/utils/baseQueryWithRefreshAuth';
import type { LoginResponse } from './authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefreshAuth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: '/auth/estate_admin_otp_login',
          method: 'POST',
          body: credentials,
        }),
      }
    ),
    validateOtp: builder.mutation<
      LoginResponse,
      { email: string; password: string; otp: string }
    >({
      query: (otpData) => ({
        url: '/auth/estate_admin_otp_validate_login',
        method: 'POST',
        body: otpData,
      }),
    }),
    logout: builder.mutation<
      {
        message: string;
        status: string;
      },
      void
    >({
      query: () => ({
        url: '/auth/estate_admin_logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useValidateOtpMutation, useLogoutMutation } =
  authApi;
