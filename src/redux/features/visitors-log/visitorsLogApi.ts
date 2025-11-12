import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefreshAuth } from '../../../shared/utils/baseQueryWithRefreshAuth';
import type { VisitorApiResponse } from './visitorsTypes';

export const visitorsApi = createApi({
  reducerPath: 'visitorsApi',
  baseQuery: baseQueryWithRefreshAuth,
  tagTypes: ['InvitesResidents'],
  endpoints: (builder) => ({
    // Get all estate Visitos with pagination and filters
    getEstateInvites: builder.query<
      VisitorApiResponse,
      {
        community_id: string;
        community_admin_id: string;
        type?: string;
        invite_id?: string;
        page?: number;
        size?: number;
        status?: string;
        search?: string;
      }
    >({
      query: ({
        community_id,
        community_admin_id,
        type = 'all',
        invite_id,
        page = 1,
        size = 20,
        status,
        search,
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          ...(invite_id && { invite_id }),
          ...(status && { status }),
          ...(search && { search }),
        });
        return `/invite/${community_id}/community_admin_fetch_estate_invites/${community_admin_id}?type=${type}&${params}`;
      },
    }),
  }),
});

export const { useGetEstateInvitesQuery } = visitorsApi;
