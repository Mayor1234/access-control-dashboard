// types/auth.ts
export interface Community {
  id: string;
  name: string;
  code: string;
  country: string;
  state: string;
  city: string;
  address: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  status: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
  role: Role;
  community: Community;
}

export interface LoginResponse {
  data: User;
  token: string;
  message: string;
  status: string;
}

// For error responses
export interface ErrorResponse {
  message: string;
  status: 'error';
  errors?: Record<string, string[]>;
}
