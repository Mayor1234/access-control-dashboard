import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import { Button } from '../../button/Button';
import {
  useAddBuildingMutation,
  useGetStreetsQuery,
} from '../../../../redux/features/community-management/communityApi';
import { useAppSelector } from '../../../../redux/app/hook';
import { toast } from 'react-toastify';
import Spinners from '../../../spinnners/Spinners';
import type { GetStreet } from '../../../../redux/features/community-management/communityTypes';
import SelectStreetButton from './SelectStreetButton';

type Props = {
  setIsModalOpen: () => void;
};

// Building Zod Schema
const buildingSchema = z.object({
  street: z
    .object({
      id: z.string(),
      name: z.string(),
      status: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'Street is required',
    }),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description must not exceed 200 characters'),
});

type BuildingFormData = z.infer<typeof buildingSchema>;

const AddBuilding: React.FC<Props> = ({ setIsModalOpen }) => {
  const community = useAppSelector((state) => state.auth.user);

  const { data: streetsResponseData } = useGetStreetsQuery();

  const [addBuilding, { isLoading }] = useAddBuildingMutation();

  const methods = useForm<BuildingFormData>({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      street: null,
      description: '',
    },
  });

  const selectedStreet = methods.watch('street');
  const description = methods.watch('description');

  // Check if form is valid
  const isFormValid = selectedStreet && description && community;

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (!community) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    if (!data.street) {
      toast.error('Please select a street.');
      return;
    }

    try {
      const response = await addBuilding({
        community_id: community.community.id,
        community_user_id: community.id,
        street_id: data.street.id,
        description: data.description,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message);
        methods.reset();
        setIsModalOpen();
      }
    } catch (error) {
      console.error('Failed to add building:', error);
    }
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-8 w-full">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Add Building
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
              <SelectStreetButton
                name="street"
                label="Select Street"
                placeholder="Select a street"
                data={streetsResponseData?.data.data as GetStreet[]}
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
                  'Add Building'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddBuilding;
