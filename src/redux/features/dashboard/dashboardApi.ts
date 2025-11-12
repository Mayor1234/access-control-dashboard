import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefreshAuth } from '../../../shared/utils/baseQueryWithRefreshAuth';
import type {
  ApiResponse,
  DashboardOverviewDailyVisitorResponse,
  DashboardOverviewResponse,
  DashboardOverviewVisitorPieResponse,
  EstateResident,
  EstateResidentsApiResponse,
} from './residentTypes';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithRefreshAuth,
  tagTypes: ['EstateResidents'],
  endpoints: (builder) => ({
    // Get all estate residents with pagination and filters
    getEstateResidents: builder.query<
      EstateResidentsApiResponse,
      {
        community_admin_id: string;
        page?: number;
        size?: number;
        status?: string;
        search?: string;
      }
    >({
      query: ({ community_admin_id, page = 1, size = 20, status, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          ...(status && { status }),
          ...(search && { search }),
        });
        return `/resident/fetch_estate_residents/${community_admin_id}?${params}`;
      },
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'EstateResidents' as const,
                id,
              })),
              { type: 'EstateResidents', id: 'LIST' },
            ]
          : [{ type: 'EstateResidents', id: 'LIST' }],
    }),

    // Get single resident by ID
    getEstateResident: builder.query<
      EstateResident,
      { community_admin_id: string; resident_id: string }
    >({
      query: ({ community_admin_id, resident_id }) =>
        `resident/fetch_estate_residents/${community_admin_id}/${resident_id}`,
      providesTags: (_, __, { resident_id }) => [
        { type: 'EstateResidents', id: resident_id },
      ],
    }),

    // Approve resident
    approveResident: builder.mutation<
      ApiResponse,
      { community_id: string; resident_id: string; community_admin_id: string }
    >({
      query: ({ community_id, resident_id, community_admin_id }) => ({
        url: `/resident/${community_id}/approve_estate_residents/${community_admin_id}`,
        method: 'POST',
        body: { resident_id },
      }),
      invalidatesTags: (_, __, { resident_id }) => [
        {
          type: 'EstateResidents',
          id: `${resident_id}`,
        },
        { type: 'EstateResidents', id: 'LIST' },
      ],
    }),

    // Reject resident
    rejectResident: builder.mutation<
      ApiResponse,
      { community_id: string; resident_id: string; community_admin_id: string }
    >({
      query: ({ community_id, resident_id, community_admin_id }) => ({
        url: `/resident/${community_id}/reject_estate_residents/${community_admin_id}`,
        method: 'POST',
        body: { resident_id },
      }),
      invalidatesTags: (_, __, { resident_id }) => [
        {
          type: 'EstateResidents',
          id: `${resident_id}`,
        },
        { type: 'EstateResidents', id: 'LIST' },
      ],
    }),

    getDashboardOverview: builder.query<
      DashboardOverviewResponse,
      { community_id: string; community_user_id: string }
    >({
      query: ({ community_id, community_user_id }) => ({
        url: `/estate_community/${community_id}/dashboard_overview/${community_user_id}`,
      }),
    }),

    getDashboardOverviewVisitorPie: builder.query<
      DashboardOverviewVisitorPieResponse,
      { community_id: string; community_user_id: string }
    >({
      query: ({ community_id, community_user_id }) => ({
        url: `/estate_community/${community_id}/dashboard_visitors_pie/${community_user_id}`,
      }),
    }),

    getDashboardOverviewDailyVisitor: builder.query<
      DashboardOverviewDailyVisitorResponse,
      { community_id: string; community_user_id: string; date?: Date }
    >({
      query: ({ community_id, community_user_id, date }) => {
        const selectedDate = date || new Date();
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;

        return {
          url: `/estate_community/${community_id}/dashboard_daily_visitors/${community_user_id}`,
          params: { year, month },
        };
      },
    }),
  }),
});

export const {
  useGetEstateResidentsQuery,
  useApproveResidentMutation,
  useRejectResidentMutation,
  useGetDashboardOverviewQuery,
  useGetDashboardOverviewVisitorPieQuery,
  useGetDashboardOverviewDailyVisitorQuery,
} = dashboardApi;
