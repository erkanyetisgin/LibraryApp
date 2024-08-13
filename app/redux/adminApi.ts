import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseUrl, supabaseAnonKey} from '@/constants/index';

export const adminApi = createApi({
  reducerPath: 'adminApi',
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
    deleteAuthor: builder.mutation({
        query: (authorId) => ({
            url: `authors/${authorId}`,
            method: 'DELETE',
        }),
    }),
    getBooks: builder.query({
        query: (searchQuery) => ({
          url: 'books',
          params: {
            or: `(title.ilike.%${searchQuery}%,isbn.ilike.%${searchQuery}%)`,
          },
        }),
      }),

    deleteBook: builder.mutation({
        query: (id) => ({
          url: `books/${id}`,
          method: 'DELETE',
            }),
    }), 
    updateAuthor: builder.mutation({
        query: ({ id, name }) => ({
            url: `authors/${id}`,
            method: 'PATCH',
            body: { name },
        }),
    }),
    updateBook: builder.mutation({
        query: ({ id, title, isbn, genre, coverimage }) => ({
            url: `books/${id}`,
            method: 'PATCH',
            body: { title, isbn, genre, coverimage },
        }),
    }),
    }),
});

export const {
    useGetAuthorsQuery, 
    useDeleteAuthorMutation, 
    useGetBooksQuery, 
    useDeleteBookMutation, 
    useUpdateAuthorMutation, 
    useUpdateBookMutation } = adminApi;
