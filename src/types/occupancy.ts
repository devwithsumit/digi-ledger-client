import type { ApiResponse } from './room';

export interface Occupancy {
    id: number;
    roomId: number;
    roomNumber: string;
    tenantName: string;
    phone: string;
    peopleCount: number;
    rentAmount: number;
    startDate: string;
    endDate: string | null;
    createdAt: string;
}

export interface CreateOccupancyRequest {
    roomId: number;
    tenantName: string;
    phone: string;
    peopleCount: number;
    rentAmount: number;
    startDate: string;
    endDate?: string | null;
}

export interface UpdateOccupancyRequest {
    roomId: number;
    tenantName: string;
    phone: string;
    peopleCount: number;
    rentAmount: number;
    startDate: string;
    endDate?: string | null;
}

export type OccupancyResponse = ApiResponse<Occupancy>;

