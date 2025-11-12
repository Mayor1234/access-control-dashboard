import { FormProvider, useForm } from 'react-hook-form';

import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import { Button } from '../../button/Button';

type Props = {
  setIsModalOpen: () => void;
};

type AddFormValues = {
  streetName: string;
  residentName: string;
};

const AddResident: React.FC<Props> = ({ setIsModalOpen }) => {
  const methods = useForm<AddFormValues>({
    defaultValues: {
      streetName: '',
      residentName: '',
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('login credential:', data);

    console.log(data);
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
          <div className="space-y-6">
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
                <FormInput name="residentName" placeholder="Street Number" />
              </div>
            </div>
            <div className="flex justify-end gap-5 w-full">
              <Button
                variant="outline"
                size="md"
                className="rounded-lg py-2"
                onClick={setIsModalOpen}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="rounded-lg py-2"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddResident;
