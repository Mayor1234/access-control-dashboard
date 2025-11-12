import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import { dashboardApi } from '../features/dashboard/dashboardApi';
import { visitorsApi } from '../features/visitors-log/visitorsLogApi';
import { communityApi } from '../features/community-management/communityApi';
import { settingsApi } from '../features/settings/settingsApi';
// import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

import errorToastMiddleware from './errorToastMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [visitorsApi.reducerPath]: visitorsApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
});

// Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'], // Only persist auth state
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authReducer,
//   [authApi.reducerPath]: authApi.reducer,
// });

// Create persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      dashboardApi.middleware,
      visitorsApi.middleware,
      communityApi.middleware,
      settingsApi.middleware,
      errorToastMiddleware // Custom error handling middleware must be the last in the chain
    ),

  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
