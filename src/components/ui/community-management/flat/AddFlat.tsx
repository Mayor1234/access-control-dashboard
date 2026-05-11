import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import { Button } from '../../button/Button';
import {
  useAddFlatMutation,
  useGetBuildingsQuery,
} from '../../../../redux/features/community-management/communityApi';
import { toast } from 'react-toastify';
import Spinners from '../../../spinnners/Spinners';
import type { GetBuilding } from '../../../../redux/features/community-management/communityTypes';
import SelectBuildingButton from './SelectBuildingButton';
import UserStorage from '../../../../shared/utils/userStorage';

type Props = {
  setIsModalOpen: () => void;
};

// Flat Zod Schema
const FlatSchema = z.object({
  building: z
    .object({
      id: z.string(),
      name: z.string(),
      status: z.string(),
    })
    .nullable(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description must not exceed 200 characters'),
});

const AddFlat: React.FC<Props> = ({ setIsModalOpen }) => {
  const community_user_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';

  const { data: buildingsResponseData } = useGetBuildingsQuery({
    community_id,
  });

  const [addFlat, { isLoading }] = useAddFlatMutation();

  const methods = useForm({
    resolver: zodResolver(FlatSchema),
    defaultValues: {
      building: null,
      description: '',
    },
  });

  const selectedBuilding = methods.watch('building');
  const description = methods.watch('description');

  // Check if form is valid
  const isFormValid =
    selectedBuilding && description && community_id && community_user_id;

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (!community_id || !community_user_id) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    if (!data.building) {
      toast.error('Please select a building.');
      return;
    }

    try {
      const response = await addFlat({
        community_id,
        community_user_id,
        building_id: data.building.id,
        description: data.description,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message);
        methods.reset();
        setIsModalOpen();
      }
    } catch (error) {
      console.error('Failed to add flat:', error);
    }
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-8 w-full">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Add Flat
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
            e.stopPropagation(); // prevent bubbling to parent form
            e.preventDefault(); // prevent native form submit
            handleSubmit(); // run RHF submission
          }}
        >
          <div className="space-y-6 w-full">
            <div className="w-full">
              <SelectBuildingButton
                name="building"
                label="Select Building"
                placeholder="Select a building"
                data={buildingsResponseData?.data.data as GetBuilding[]}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="description"
                className="block mb-3 text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <div>
                <FormInput name="description" placeholder="Description" />
              </div>
            </div>
            <div className="flex justify-end gap-5">
              <Button
                variant="outline"
                size="md"
                className="rounded-lg px-5 py-2 w-fit"
                onClick={setIsModalOpen}
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
                  <Spinners
                    variant="dots"
                    size="sm"
                    color="white"
                    label="Wait..."
                  />
                ) : (
                  'Add Flat'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddFlat;
