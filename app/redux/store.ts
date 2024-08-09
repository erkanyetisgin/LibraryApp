import { configureStore } from '@reduxjs/toolkit';
import { authorsApi } from './authorsApi';

export const store = configureStore({
  reducer: {
    [authorsApi.reducerPath]: authorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorsApi.middleware),
});
