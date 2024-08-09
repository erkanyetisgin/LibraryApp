import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseUrl, supabaseAnonKey} from '@/constants/index';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('apikey', supabaseAnonKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: (searchQuery) => ({
        url: 'authors',
        params: {
          name: `ilike.%${searchQuery}%`, 
        },
      }),
    }),
    addAuthor: builder.mutation({
      query: (newAuthor) => ({
        url: 'authors',
        method: 'POST',
        body: newAuthor,
      }),
    }),
  }),
});

export const { useGetAuthorsQuery, useAddAuthorMutation } = authorsApi;
