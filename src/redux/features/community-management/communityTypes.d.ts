type Status = 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';

// --------------------------------------Streets--------------------------------------------

export interface GetStreet {
  id: string;
  name: string;
  status: Status;
  starting_number: number;
  ending_number: number;
  created_at: Date;
  community: {
    id: string;
    name: string;
    address: string;
  };
}

// Create Street
export interface CreateStreet {
  id: string;
  name: string;
  status: string;
  starting_number: number;
  ending_number: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Fetch Streets and Buildings with pagination and filters
export interface GetStreetApiResponse {
  data: {
    data: GetStreet[];
    meta: {
      page: number;
      size: number;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: 'success' | 'error';
}

export interface CreateStreetApiResponse {
  data: CreateStreet;
  message: string;
  status: 'success' | 'error';
}

// --------------------------------------BUildings--------------------------------------------

export interface GetBuilding {
  id: string;
  description: string;
  status: Status;
  created_at: Date;
  street: {
    id: string;
    name: string;
    status: Status;
  };
}

// Create Building
export interface CreateBuilding {
  id: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GetBuildingApiResponse {
  data: {
    data: Building[];
    meta: {
      page: number;
      size: number;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: 'success' | 'error';
}

export interface CreateBuildingApiResponse {
  data: Building;
  message: string;
  status: 'success' | 'error';
}

// --------------------------------------Flats--------------------------------------------

export interface GetFlat {
  id: string;
  description: string;
  status: Status;
  created_at: Date;
  building: {
    id: string;
    description: string;
    status: Status;
  };
}

// Create Flat
export interface CreateFlat {
  id: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GetFlatApiResponse {
  data: {
    data: Building[];
    meta: {
      page: number;
      size: number;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: 'success' | 'error';
}

export interface CreateFlatApiResponse {
  data: Building;
  message: string;
  status: 'success' | 'error';
}
