export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

export interface EstateResident {
  id: string;
  status: string;
  created_at: string; // ISO 8601 string
  updated_at: string; // ISO 8601 string
  user: User;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  status: string;
}

export type EstateResidentsApiResponse = ApiResponse<{
  data: EstateResident[];
  meta: PaginationMeta;
}>;

export type DashboardOverview = {
  total_visitors: number;
  active_visitors: number;
  active_residents: number;
  pending_residents: number;
};

export interface DashboardOverviewResponse {
  data: DashboardOverview;
  message: string;
  status: string;
}

export type DashboardOverviewVisitorPie = {
  checked_in_visitors: number;
  checked_out_visitors: number;
};

export interface DashboardOverviewVisitorPieResponse {
  data: DashboardOverviewVisitorPie;
  message: string;
  status: string;
}

export type DashboardOverviewDailyVisitor = {
  month: number;
  year: number;
  estate_data: { day: string; visitors_count: string }[];
};

export interface DashboardOverviewDailyVisitorResponse {
  data: DashboardOverviewDailyVisitor;
  message: string;
  status: string;
}


export interface FetchApiResponse {
  data: {
    data: ResidentAssignment[];
    meta: {
      page: string;
      size: number;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: string;
}

export interface ResidentAssignment {
  id: string;
  status: string; // Could be "approved", "pending", "rejected", etc.
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
  resident: Resident;
  building: Building;
}

interface Resident {
  id: string;
  user: User;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

interface Building {
  id: string;
  building_number: string;
  description: string;
  street: Street;
}

interface Street {
  id: string;
  name: string;
}