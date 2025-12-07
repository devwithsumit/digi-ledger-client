export interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    isActive: boolean;
    ownerName?: string | null;
    ownerId?: number;
}

export interface CreateRoomRequest {
    roomNumber: string;
    roomType: string;
}

export interface UpdateRoomRequest {
    roomNumber: string;
    roomType: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}
