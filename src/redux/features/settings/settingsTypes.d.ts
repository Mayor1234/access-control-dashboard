export type AdminStatus =
  | 'pending'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'rejected';
export type ApiStatus = 'success' | 'error';

export type Roles =
  | 'super_admin'
  | 'community_admin'
  | 'estate_admin'
  | 'security_admin'
  | 'resident_admin'
  | 'staff_admin';

export interface EstateAdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: AdminStatus;
  role: {
    id: string;
    name: Roles;
    description: string;
  };
  created_at: string;
  updated_at: string;
}

export interface GetAdminsUserApiResponse {
  data: {
    data: EstateAdminUser[];
    meta: {
      page: number;
      size: number;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: ApiStatus;
}

export interface CommunityAdminRole {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  permission: string[];
  created_at: string;
  updated_at: string;
}

interface Meta {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

export interface CommunityAdminRoleApiResponse {
  data: {
    data: CommunityAdminRole[];
    meta: Meta;
  };
  message: string;
  status: ApiStatus;
}

export interface CreateCommunityAdminApiResponse {
  data: {
    data: null;
  };
  message: string;
  status: ApiStatus;
}
