import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefreshAuth } from '../../../shared/utils/baseQueryWithRefreshAuth';
import type {
  CreateBuildingApiResponse,
  CreateFlatApiResponse,
  CreateStreetApiResponse,
  GetBuildingApiResponse,
  GetFlatApiResponse,
  GetStreetApiResponse,
} from './communityTypes';

export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: baseQueryWithRefreshAuth,
  tagTypes: ['InvitesResidents'],
  endpoints: (builder) => ({
    // Get all Estate Street with pagination and filters
    getStreets: builder.query<GetStreetApiResponse, void>({
      query: () => `/street/fetch`,
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'InvitesResidents' as const,
                id,
              })),
              { type: 'InvitesResidents', id: 'LIST' },
            ]
          : [{ type: 'InvitesResidents', id: 'LIST' }],
    }),

    // Add street
    addStreet: builder.mutation<
      CreateStreetApiResponse,
      {
        community_id: string;
        community_user_id: string;
        name: string;
        starting_number: string;
        ending_number: string;
      }
    >({
      query: (body) => ({
        url: `/street/add_estate_street`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'InvitesResidents', id: 'LIST' }],
    }),

    // Get all Estate Buildings with pagination and filters
    getBuildings: builder.query<
      GetBuildingApiResponse,
      { community_id: string }
    >({
      query: ({ community_id }) =>
        `/building/fetch_estate_building?community_id=${community_id}`,
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'InvitesResidents' as const,
                id,
              })),
              { type: 'InvitesResidents', id: 'LIST' },
            ]
          : [{ type: 'InvitesResidents', id: 'LIST' }],
    }),

    // Add street
    addBuilding: builder.mutation<
      CreateBuildingApiResponse,
      {
        community_id: string;
        community_user_id: string;
        street_id: string;
        description: string;
      }
    >({
      query: (body) => ({
        url: `/building/add_estate_building`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'InvitesResidents', id: 'LIST' }],
    }),

    // Get all Building Flats with pagination and filters
    getFlats: builder.query<GetFlatApiResponse, { community_id: string }>({
      query: ({ community_id }) =>
        `/flat/fetch_flat?community_id=${community_id}`,
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'InvitesResidents' as const,
                id,
              })),
              { type: 'InvitesResidents', id: 'LIST' },
            ]
          : [{ type: 'InvitesResidents', id: 'LIST' }],
    }),

    // Add street
    AddFlat: builder.mutation<
      CreateFlatApiResponse,
      {
        community_id: string;
        community_user_id: string;
        building_id: string;
        description: string;
      }
    >({
      query: (body) => ({
        url: `/flat/add_estate_flat`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'InvitesResidents', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetStreetsQuery,
  useAddStreetMutation,
  useGetBuildingsQuery,
  useAddBuildingMutation,
  useGetFlatsQuery,
  useAddFlatMutation,
} = communityApi;
