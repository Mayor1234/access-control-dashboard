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
import { useAddCommunityAdminRoleMutation } from '../../../redux/features/settings/settingsApi';
import UserStorage from '../../../shared/utils/userStorage';

type Props = {
  setIsModalOpen: () => void;
};

// Available permissions list
const AVAILABLE_PERMISSIONS = [
  { value: 'access-management', label: 'Access Management' },
  { value: 'role-management', label: 'Role Management' },
  { value: 'super', label: 'Super' },
];

// Admin User Zod Schema
const AdminUserSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description must not exceed 200 characters'),
  roles: z.array(z.string()).min(1, 'Please select at least one permission'),
});

type AdminUserFormData = z.infer<typeof AdminUserSchema>;

const AddAdminRole: React.FC<Props> = ({ setIsModalOpen }) => {
  const community = useAppSelector((state) => state.auth.user);

  const community_admin_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const [addCommunityAdminRole, { isLoading }] =
    useAddCommunityAdminRoleMutation();

  const methods = useForm<AdminUserFormData>({
    resolver: zodResolver(AdminUserSchema),
    defaultValues: {
      name: '',
      description: '',
      roles: [],
    },
  });

  const name = methods.watch('name');
  const description = methods.watch('description');

  // Check if form is valid
  const isFormValid =
    name && description && selectedPermissions.length > 0 && community;

  // Toggle permission selection
  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) => {
      const newRoles = prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission];

      // Update form value
      methods.setValue('roles', newRoles, { shouldValidate: true });
      return newRoles;
    });
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (!community) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    try {
      const response = await addCommunityAdminRole({
        community_admin_id,
        community_id,
        name: data.name,
        description: data.description,
        permissions: data.roles,
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
          <div className="space-y-6 w-full">
            {/* Name Field */}
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-3 text-sm font-medium text-pry-text"
              >
                Role Name
              </label>
              <FormInput
                name="name"
                placeholder="Enter role name (e.g., Security Manager)"
              />
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
                placeholder="Enter role description"
              />
            </div>

            {/* Permissions Field */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-medium text-pry-text">
                Roles
              </label>
              <div className="border border-border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_PERMISSIONS.map((permission) => (
                    <label
                      key={permission.value}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.value)}
                        onChange={() => togglePermission(permission.value)}
                        className="w-5 h-5 text-blue-600  border-border rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-pry-text group-hover:text-gray-900">
                        {permission.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {methods.formState.errors.roles && (
                <p className="mt-1 text-sm text-red-600">
                  {methods.formState.errors.roles.message}
                </p>
              )}
            </div>

            {/* Selected Permissions Display */}
            {selectedPermissions.length > 0 && (
              <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Selected Roles ({selectedPermissions.length})
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
                  'Create Admin Role'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddAdminRole;
