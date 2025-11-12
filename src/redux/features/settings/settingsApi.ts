import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefreshAuth } from '../../../shared/utils/baseQueryWithRefreshAuth';
import type {
  CommunityAdminRoleApiResponse,
  CreateCommunityAdminApiResponse,
  GetAdminsUserApiResponse,
} from './settingsTypes';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: baseQueryWithRefreshAuth,
  tagTypes: ['AdminUser', 'AdminRole'],
  endpoints: (builder) => ({
    // Get admin users
    getAdminUsers: builder.query<
      GetAdminsUserApiResponse,
      {
        community_id: string;
        community_user_id: string;
        community_role_id?: string;
      }
    >({
      query: ({ community_id, community_user_id, community_role_id }) => ({
        url: `/community/${community_id}/get_community_admins_by_role/${community_user_id}`,
        params: {
          size: 10,
          page: 1,
          ...(community_role_id && { role_id: community_role_id }), // Only add if exists
        },
      }),
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'AdminUser' as const,
                id,
              })),
              { type: 'AdminUser', id: 'LIST' },
            ]
          : [{ type: 'AdminUser', id: 'LIST' }],
    }),

    // Add Community Admin User
    addCommunityAdminUser: builder.mutation<
      CreateCommunityAdminApiResponse,
      {
        community_id: string;
        community_admin_id: string;
        community_role_id: string;
        first_name: string;
        last_name: string;
        email: string;
        description: string;
        permissions: string[];
      }
    >({
      query: (body) => ({
        url: `/community/create_community_user/${body.community_admin_id}`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'AdminUser', id: 'LIST' }],
    }),

    // Get Community Admin Roles
    getCommunityAdminRoles: builder.query<
      CommunityAdminRoleApiResponse,
      {
        community_id: string;
        community_user_id: string;
        community_role_id?: string;
      }
    >({
      query: ({ community_id, community_user_id, community_role_id }) => ({
        url: `/community/${community_id}/fetch_community_roles/${community_user_id}`,
        params: {
          size: 10,
          page: 1,
          ...(community_role_id && { role_id: community_role_id }), // Only add if exists
        },
      }),
      providesTags: (result) =>
        result?.data.data
          ? [
              ...result.data.data.map(({ id }: { id: string }) => ({
                type: 'AdminRole' as const,
                id,
              })),
              { type: 'AdminRole', id: 'LIST' },
            ]
          : [{ type: 'AdminRole', id: 'LIST' }],
    }),

    // Create Community Admin Role
    addCommunityAdminRole: builder.mutation<
      CreateCommunityAdminApiResponse,
      {
        community_id: string;
        community_admin_id: string;
        name: string;
        description: string;
        permissions: string[];
      }
    >({
      query: ({
        community_admin_id,
        community_id,
        name,
        description,
        permissions,
      }) => ({
        url: `/community/create_community_role/${community_admin_id}`,
        method: 'POST',
        body: {
          community_id,
          name,
          description,
          permissions,
        },
      }),
      invalidatesTags: [{ type: 'AdminRole', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useAddCommunityAdminUserMutation,
  useGetCommunityAdminRolesQuery,
  useAddCommunityAdminRoleMutation,
} = settingsApi;
