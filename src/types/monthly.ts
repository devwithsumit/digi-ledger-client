export interface MonthlyOverviewItem {
    roomId: number;
    roomNumber: string;
    tenantName: string;
    rentAmount: number;
    rentSnapshot: number;
    rentStatus: string;
    currentUnit: number | null;
    electricityRate: number;
    electricityStatus: string;
    hasPersistedRecord: boolean;
    notes: string | null;
    occupancyId: number;
    peopleCount: number;
    phone: string;
    year: number;
    month: number;
}

export interface MonthlySummary {
    year: number;
    month: number;
    totalTenants: number;
    paidCount: number;
    unpaidCount: number;
}

export interface MonthlyOverviewResponse {
    year: number;
    month: number;
    records: MonthlyOverviewItem[];
    summary: MonthlySummary;
}

export interface MonthlyRecord {
    id: number;
    roomId: number;
    roomNumber: string;
    year: number;
    month: number;
    rentStatus: 'PAID' | 'UNPAID';
    electricityStatus: 'PAID' | 'UNPAID';
    currentUnit: number | null;
    previousUnit: number | null;
    electricityRate: number | null;
    electricityBill: number | null;
    rentSnapshot: number | null;
    notes: string | null;
    paymentDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface MonthlyUpdateRequest {
    rentStatus?: 'PAID' | 'UNPAID';
    notes?: string | null;
    currentUnit?: number | null;
    electricityStatus?: 'PAID' | 'UNPAID';
}

export interface ApiErrorResponse {
    error: string;
    message: string;
    status: number;
    timestamp: string;
}
