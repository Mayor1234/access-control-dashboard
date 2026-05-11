import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import { Button } from '../../button/Button';
import {
  useGetStreetsQuery,
  useUpdateBuildingMutation,
} from '../../../../redux/features/community-management/communityApi';
import { toast } from 'react-toastify';
import Spinners from '../../../spinnners/Spinners';
import type { GetBuilding, GetStreet } from '../../../../redux/features/community-management/communityTypes';
import SelectStreetButton from './SelectStreetButton';
import UserStorage from '../../../../shared/utils/userStorage';

type Props = {
  building: GetBuilding;
  onClose: () => void;
};

const buildingSchema = z.object({
  street: z
    .object({ id: z.string(), name: z.string(), status: z.string() })
    .nullable()
    .refine((val) => val !== null, { message: 'Street is required' }),
  buildingNumber: z.string().min(1, 'Building number is required').trim(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description must not exceed 200 characters'),
});

const EditBuilding: React.FC<Props> = ({ building, onClose }) => {
  const community_user_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';

  const { data: streetsResponseData } = useGetStreetsQuery(
    { community_id },
    { skip: !community_id },
  );

  const [updateBuilding, { isLoading }] = useUpdateBuildingMutation();

  const methods = useForm({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      street: building.street
        ? { id: building.street.id, name: building.street.name, status: building.street.status }
        : null,
      buildingNumber: building.building_number ?? '',
      description: building.description ?? '',
    },
  });

  const selectedStreet = methods.watch('street');
  const description = methods.watch('description');
  const isFormValid = selectedStreet && description && community_id && community_user_id;

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (!data.street) return;
    try {
      const response = await updateBuilding({
        building_id: building.id,
        community_id,
        community_user_id,
        street_id: data.street.id,
        building_number: data.buildingNumber,
        description: data.description,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message);
        onClose();
      }
    } catch {
      toast.error('Failed to update building. Please try again.');
    }
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-8 w-full">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Edit Building
        </h2>
        <button type="button" onClick={onClose} className="cursor-pointer">
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
            <div className="w-full">
              <SelectStreetButton
                name="street"
                label="Select street name"
                placeholder="Select a street"
                data={streetsResponseData?.data.data as GetStreet[]}
              />
            </div>
            <div className="w-full">
              <label className="block mb-3 text-sm font-medium text-gray-600">
                Building number
              </label>
              <FormInput name="buildingNumber" placeholder="Building number" />
            </div>
            <div className="w-full">
              <label className="block mb-3 text-sm font-medium text-gray-600">
                Description
              </label>
              <FormInput name="description" placeholder="Description" />
            </div>
            <div className="flex justify-end gap-5">
              <Button
                variant="outline"
                size="md"
                className="rounded-lg px-5 py-2 w-fit"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="rounded-lg px-5 py-2 w-fit disabled:bg-pry-light disabled:cursor-not-allowed"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <Spinners variant="dots" size="sm" color="white" label="Saving..." />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default EditBuilding;
