import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../redux/app/store';

// Simple base query without auth (for refresh token call)
export const simpleBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  mode: 'cors', // Ensure CORS mode
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('X-Requested-With', 'XMLHttpRequest');
    return headers;
  },
});

// Base query with auth header preparation
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    console.log('Preparing headers, token:', token);
    if (token) {
      headers.set('Authorization', `${token}`);
    }

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('X-Requested-With', 'XMLHttpRequest');
    return headers;
  },
});
