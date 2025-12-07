import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateRoomRequest, UpdateRoomRequest, Room, ApiResponse } from '@/types/room';
import type { RootState } from '@/store';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const roomsApi = createApi({
    reducerPath: 'roomsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Room', 'Occupancy'],
    endpoints: (builder) => ({
        getRooms: builder.query<Room[], void>({
            query: () => '/rooms',
            providesTags: ['Room'],
        }),
        getRoomById: builder.query<Room, number>({
            query: (roomId) => `/rooms/${roomId}`,
            providesTags: (_result, _error, id) => [{ type: 'Room', id }],
        }),
        createRoom: builder.mutation<Room, CreateRoomRequest>({
            query: (data) => ({
                url: '/rooms',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),
        updateRoom: builder.mutation<ApiResponse<Room>, { id: number; data: UpdateRoomRequest }>({
            query: ({ id, data }) => ({
                url: `/rooms/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Room', 'Occupancy'],
        }),
        deleteRoom: builder.mutation<ApiResponse<Room>, number>({
            query: (roomId) => ({
                url: `/rooms/${roomId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Room', 'Occupancy'],
        }),
    }),
});

export const {
    useGetRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomsApi;
