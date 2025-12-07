import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import type {
    MonthlyOverviewResponse,
    MonthlyRecord,
    MonthlyUpdateRequest,
} from '@/types/monthly';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const monthlyApi = createApi({
    reducerPath: 'monthlyApi',
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
    tagTypes: ['Monthly', 'Room', 'Occupancy'],
    endpoints: (builder) => ({
        getMonthlyOverview: builder.query<
            MonthlyOverviewResponse,
            { year?: number; month?: number; rentStatus?: string }>({
                query: (params) => {
                    const queryParams = new URLSearchParams();
                    if (params.year) queryParams.append('year', params.year.toString());
                    if (params.month) queryParams.append('month', params.month.toString());
                    if (params.rentStatus) queryParams.append('rentStatus', params.rentStatus);
                    const queryString = queryParams.toString();
                    return `/monthly/overview${queryString ? `?${queryString}` : ''}`;
                },
                providesTags: ['Monthly'],
            }),
        listMonthlyRecordOfRoom: builder.query<
            MonthlyRecord[],
            { roomId: number; year: number }
        >({
            query: ({ roomId, year }) => `/monthly/room/${roomId}?year=${year}`,
            providesTags: (_result, _error, { roomId }) => [
                { type: 'Monthly', id: roomId },
            ],
        }),
        upsertMonthlyRecord: builder.mutation<
            MonthlyRecord,
            {
                roomId: number;
                year: number;
                month: number;
                data: MonthlyUpdateRequest;
            }
        >({
            query: ({ roomId, year, month, data }) => ({
                url: `/monthly/room/${roomId}/year/${year}/month/${month}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Monthly', 'Room', 'Occupancy'],
        }),
    }),
});

export const {
    useGetMonthlyOverviewQuery,
    useListMonthlyRecordOfRoomQuery,
    useUpsertMonthlyRecordMutation,
} = monthlyApi;

