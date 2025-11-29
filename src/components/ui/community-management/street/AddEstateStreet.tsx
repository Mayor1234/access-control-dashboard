import { FormProvider, useForm } from 'react-hook-form';

import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import { Button } from '../../button/Button';
import { useAddStreetMutation } from '../../../../redux/features/community-management/communityApi';
import UserStorage from '../../../../shared/utils/userStorage';
import { useAppSelector } from '../../../../redux/app/hook';
import { toast } from 'react-toastify';
import Spinners from '../../../spinnners/Spinners';

type Props = {
  setIsModalOpen: () => void;
};

type AddFormValues = {
  streetName: string;
  streetStart: string;
  streetEnd: string;
};

const AddEstateStreet: React.FC<Props> = ({ setIsModalOpen }) => {
  const community_admin_id = UserStorage.getCommunityAdminId() as string;
  const community_id = useAppSelector(
    (state) => state.auth.user?.community.id
  ) as string;

  const [addStreet, { isLoading }] = useAddStreetMutation();

  const methods = useForm<AddFormValues>({
    defaultValues: {
      streetName: '',
      streetStart: '',
      streetEnd: '',
    },
  });

  const selectedStreetName = methods.watch('streetName');
  const streetStart = methods.watch('streetStart');
  const streetEnd = methods.watch('streetEnd');

  // Check if form is valid
  const isFormValid = selectedStreetName && streetStart && streetEnd;

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await addStreet({
        community_id,
        community_user_id: community_admin_id,
        name: data.streetName,
        starting_number: data.streetStart,
        ending_number: data.streetEnd,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(response.message);
        setIsModalOpen();
      }
    } catch (error) {
      console.error('Failed to add street:', error);
    }
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-8 w-full">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Add Street
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
              <label
                htmlFor="streetName"
                className="block mb-3 text-sm font-medium text-gray-600"
              >
                Street Name
              </label>
              <div>
                <FormInput name="streetName" placeholder="Street Name" />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="streetNumber"
                className="block mb-3 text-sm font-medium text-gray-600"
              >
                Street Number (Start)
              </label>
              <div>
                <FormInput
                  name="streetStart"
                  placeholder="Start Street Number"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="streetNumber"
                className="block mb-3 text-sm font-medium text-gray-600"
              >
                Street Number (End)
              </label>
              <div>
                <FormInput name="streetEnd" placeholder="End Street Number" />
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
                  'Continue'
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddEstateStreet;
