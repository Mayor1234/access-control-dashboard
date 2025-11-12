interface InviteUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

export interface Invite {
  id: string;
  name: string;
  mobile_number: string;
  purpose: string;
  qr_code: string; // base64 encoded image
  no_of_guests: number;
  code: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: string;
  checkin_time: string | null;
  checkout_time: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user: InviteUser;
}

export interface VisitorApiResponse {
  data: {
    data: Invite[];
    meta: {
      page: string;
      size: string;
      totalPages: number;
      totalCount: number;
    };
  };
  message: string;
  status: 'success' | 'error'; // assuming it could also be "error"
}
