// booksApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, supabaseAnonKey } from '@/constants/index';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('apikey', supabaseAnonKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchQuery) => ({
        url: 'books',
        params: {
          or: `(title.ilike.%${searchQuery}%,isbn.ilike.%${searchQuery}%)`,
        },
      }),
    }),
    getBooksWithAuthors: builder.query({
      query: (searchQuery) => ({
        url: 'rpc/get_books_with_authors',
        method: 'POST',
        body: { search_query: searchQuery }, 
      }),
    }),
    getAuthors: builder.query({
      query: () => ({
        url: 'authors',
      }),
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      
      }),
    }),
    addBookAuthor: builder.mutation({
      query: (bookAuthor) => ({
        url: 'bookauthors',
        method: 'POST',
        body: bookAuthor,
      }),
    }),
      
    updateBook: builder.mutation({
      query: ({ id, ...updatedBook }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: updatedBook,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
    }), 
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksWithAuthorsQuery,
  useGetAuthorsQuery,
  useAddBookMutation,
  useAddBookAuthorMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
