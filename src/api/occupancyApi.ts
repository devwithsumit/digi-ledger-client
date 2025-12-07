import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import type {
    Occupancy,
    CreateOccupancyRequest,
    UpdateOccupancyRequest,
    OccupancyResponse,
} from '@/types/occupancy';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const occupancyApi = createApi({
    reducerPath: 'occupancyApi',
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
    tagTypes: ['Occupancy', 'Room'],
    endpoints: (builder) => ({
        getOccupancies: builder.query<Occupancy[], void>({
            query: () => '/occupancy',
            providesTags: ['Occupancy'],
        }),
        getOccupancyById: builder.query<Occupancy, number>({
            query: (id) => `/occupancy/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Occupancy', id }],
        }),
        createOccupancy: builder.mutation<Occupancy, CreateOccupancyRequest>({
            query: (data) => ({
                url: '/occupancy',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Occupancy', 'Room'],
        }),
        updateOccupancy: builder.mutation<OccupancyResponse, { id: number; data: UpdateOccupancyRequest }>({
            query: ({ id, data }) => ({
                url: `/occupancy/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Occupancy', 'Room'],
        }),
        deleteOccupancy: builder.mutation<OccupancyResponse, number>({
            query: (id) => ({
                url: `/occupancy/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Occupancy', 'Room'],
        }),
    }),
});

export const {
    useGetOccupanciesQuery,
    useGetOccupancyByIdQuery,
    useCreateOccupancyMutation,
    useUpdateOccupancyMutation,
    useDeleteOccupancyMutation,
} = occupancyApi;

