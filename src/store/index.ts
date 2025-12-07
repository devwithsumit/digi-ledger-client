import { configureStore } from '@reduxjs/toolkit';
import { onwerAuthApi } from '@/api/onwerAuthApi';
import { roomsApi } from '@/api/roomsApi';
import { occupancyApi } from '@/api/occupancyApi';
import { monthlyApi } from '@/api/monthlyApi';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [onwerAuthApi.reducerPath]: onwerAuthApi.reducer,
        [roomsApi.reducerPath]: roomsApi.reducer,
        [occupancyApi.reducerPath]: occupancyApi.reducer,
        [monthlyApi.reducerPath]: monthlyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            onwerAuthApi.middleware,
            roomsApi.middleware,
            occupancyApi.middleware,
            monthlyApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

