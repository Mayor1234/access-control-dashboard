import { toast } from 'react-toastify';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

interface ErrorResponse {
  payload: {
    data: {
      errors?: Array<{ message: string }>;
    };
    status?: number;
  };
}
const errorToastMiddleware: Middleware = () => (next) => (action: unknown) => {
  if (isRejectedWithValue(action) && isErrorResponse(action)) {
    // 🔁 Handle Unauthorized (403)
    if (action.payload.status === 403) {
      toast.error('Session expired. log in to continue');
    }
    // Safely extract error message
    const errorMsg =
      action.payload?.data?.errors?.[0]?.message || // API's error format
      action.error?.message || // fallback: thunk internal error
      'Something went wrong';

    toast.error(errorMsg);
  }

  return next(action);
};

// Type guard to check if the action is an ErrorResponse
function isErrorResponse(action: unknown): action is ErrorResponse {
  return (
    typeof action === 'object' &&
    action !== null &&
    'payload' in action &&
    typeof (action as ErrorResponse).payload === 'object' &&
    'data' in (action as ErrorResponse).payload
  );
}

export default errorToastMiddleware;
