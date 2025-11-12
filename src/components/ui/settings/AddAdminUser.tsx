import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAppSelector } from '../../../redux/app/hook';
import FormInput from '../forms/FormInput';
import { Button } from '../button/Button';
import Spinners from '../../spinnners/Spinners';
import {
  useAddCommunityAdminUserMutation,
  useGetCommunityAdminRolesQuery,
} from '../../../redux/features/settings/settingsApi';
import type { CommunityAdminRoleApiResponse } from '../../../redux/features/settings/settingsTypes';

type Props = {
  setIsModalOpen: () => void;
};

// Admin User Zod Schema
const AdminUserSchema = z.object({
  first_name: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  last_name: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Last name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase(), // Automatically lowercase the email
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  permissions: z
    .array(z.string())
    .min(1, 'Please select at least one permission')
    .max(10, 'You can select up to 10 permissions'),
});

type AdminUserFormData = z.infer<typeof AdminUserSchema>;

const AddAdminUser: React.FC<Props> = ({ setIsModalOpen }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const community = useAppSelector((state) => state.auth.user);

  const { data: communityRolesResponseData, isLoading: isLoadingRoles } =
    useGetCommunityAdminRolesQuery({
      community_id: community?.community.id || '',
      community_user_id: community?.id || '',
    });

  const convertToPermissions = (apiData: CommunityAdminRoleApiResponse) => {
    return apiData.data.data
      .filter((role) => role.status === 'active')
      .map((role) => ({
        value: role.name.toLowerCase().replace(/\s+/g, '-'),
        label: role.name,
      }));
  };

  const AVAILABLE_PERMISSIONS = communityRolesResponseData
    ? convertToPermissions(communityRolesResponseData)
    : [];

  const [addCommunityAdminUser, { isLoading }] =
    useAddCommunityAdminUserMutation();

  const methods = useForm<AdminUserFormData>({
    resolver: zodResolver(AdminUserSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      description: '',
      permissions: [],
    },
  });

  const first_name = methods.watch('first_name');
  const last_name = methods.watch('last_name');
  const email = methods.watch('email');
  const description = methods.watch('description');

  // Check if form is valid
  const isFormValid =
    first_name &&
    last_name &&
    email &&
    description &&
    selectedPermissions.length > 0 &&
    community;

  // Toggle permission selection
  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) => {
      const newPermissions = prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission];

      // Update form value
      methods.setValue('permissions', newPermissions, { shouldValidate: true });
      return newPermissions;
    });
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (!community) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    try {
      const response = await addCommunityAdminUser({
        community_admin_id: community.id,
        community_id: community.community.id,
        community_role_id: community.role.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        description: data.description,
        permissions: data.permissions,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message || 'Admin user created successfully');
        methods.reset();
        setSelectedPermissions([]);
        setIsModalOpen();
      }
    } catch (error) {
      console.error('Failed to add admin user:', error);
    }
  });

  return (
    <section className="bg-white rounded-lg p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-8 w-full">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Add Admin User
        </h2>
        <button
          type="button"
          onClick={setIsModalOpen}
          className="cursor-pointer"
        >
          <MdOutlineClose className="text-pry" size={20} />
        </button>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-3 w-full">
            {/* Name Field */}
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-3 text-sm font-medium text-pry-text"
              >
                User First Name
              </label>
              <FormInput
                name="first_name"
                placeholder="Enter user fisrt name"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="last_name"
                className="block mb-3 text-sm font-medium text-pry-text"
              >
                User Last Name
              </label>
              <FormInput name="last_name" placeholder="Enter user last name" />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-3 text-sm font-medium text-pry-text"
              >
                Email Address
              </label>
              <FormInput name="email" placeholder="Enter user email address" />
            </div>

            {/* Description Field */}
            <div className="w-full">
              <label
                htmlFor="description"
                className="block mb-3 text-sm font-medium text-pry-text"
              >
                Description
              </label>
              <FormInput
                name="description"
                placeholder="Enter user description"
              />
            </div>

            {/* Permissions Field */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-medium text-pry-text">
                Permissions
              </label>
              <div className="border border-border rounded-lg p-4">
                {isLoadingRoles ? (
                  <div className="flex items-center justify-center">
                    <Spinners
                      variant="default"
                      size="md"
                      color="primary"
                      label="Loading roles..."
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AVAILABLE_PERMISSIONS.map((permission) => (
                      <label
                        key={permission.value}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(
                            permission.value
                          )}
                          onChange={() => togglePermission(permission.value)}
                          className="w-5 h-5 text-blue-600  border-border rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm text-pry-text group-hover:text-gray-900">
                          {permission.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {methods.formState.errors.permissions && (
                <p className="mt-1 text-sm text-red-600">
                  {methods.formState.errors.permissions.message}
                </p>
              )}
            </div>

            {/* Selected Permissions Display */}
            {selectedPermissions.length > 0 && (
              <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Selected Permissions ({selectedPermissions.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPermissions.map((permission) => (
                    <span
                      key={permission}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {
                        AVAILABLE_PERMISSIONS.find(
                          (p) => p.value === permission
                        )?.label
                      }
                      <button
                        type="button"
                        onClick={() => togglePermission(permission)}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-5 w-full pt-4">
              <Button
                variant="outline"
                size="md"
                className="rounded-lg py-2 w-full"
                onClick={setIsModalOpen}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="rounded-lg py-2 w-full disabled:bg-pry-light disabled:cursor-not-allowed"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <Spinners
                    variant="dots"
                    size="sm"
                    color="white"
                    label="Wait..."
                  />
                ) : (
                  'Create Admin User'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddAdminUser;
