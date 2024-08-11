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
      query: ({ searchQuery, sortBy, sortDirection }) => ({
        url: 'rpc/get_books_with_authors',
        method: 'POST',
        body: { 
          search_query: searchQuery,
          sort_by: sortBy, 
          sort_direction: sortDirection 
        },
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
    addUserBook: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: 'usersbooks',
        method: 'POST',
        body: { user_id: userId, book_id: bookId },
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
    myBooks: builder.query({
      query: (userId) => ({
        url: 'rpc/get_my_books',
        method: 'POST',
        body: { user_id: userId },
      }),
    }),
    deleteMyBook: builder.mutation({
      query: (id) => ({
         url: `/usersbooks/${id}`,
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
  useAddUserBookMutation,
  useMyBooksQuery, 
  useDeleteMyBookMutation,
} = booksApi;
