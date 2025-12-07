import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, SignInRequest, SignUpRequest, User, UpdateProfileRequest, UpdateProfileResponse } from '@/types/auth';
import type { RootState } from '@/store';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const onwerAuthApi = createApi({
    reducerPath: 'onwerAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + '/auth',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, SignInRequest>({
            query: (credentials) => ({
                url: '/owner/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation<AuthResponse, SignUpRequest>({
            query: (data) => ({
                url: '/owner/signup',
                method: 'POST',
                body: data,
            }),
        }),
        getProfile: builder.query<User, void>({
            query: () => '/owner/profile',
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
            query: (data) => ({
                url: '/user',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useGetProfileQuery, useUpdateProfileMutation } = onwerAuthApi;
