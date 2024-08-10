import { configureStore } from '@reduxjs/toolkit';
import { authorsApi } from './authorsApi';
import { booksApi } from './booksApi'; 

export const store = configureStore({
  reducer: {
    [authorsApi.reducerPath]: authorsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authorsApi.middleware,
      booksApi.middleware
    ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
