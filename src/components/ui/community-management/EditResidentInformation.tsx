import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../forms/FormInput';
import { Button } from '../button/Button';
import { GoPlus } from 'react-icons/go';

type Props = {
  setIsEditOpen: () => void;
};

type LoginValues = {
  name: string;
  email: string;
  phone: string;
  houseNo: string;
  street: string;
  houseHoldmembers: string;
  vehicleDetails: string;
};

const EditResidentInformation: React.FC<Props> = ({ setIsEditOpen }) => {
  const methods = useForm<LoginValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      houseNo: '',
      street: '',
      houseHoldmembers: '',
      vehicleDetails: '',
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('login credential:', data);
  });

  return (
    <section className="h-full w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Edit Resident Information
        </h2>
        <button
          type="button"
          onClick={setIsEditOpen}
          className="cursor-pointer"
        >
          <MdOutlineClose className="text-pry" size={20} />
        </button>
      </div>

      {/* Enhanced scrollable container with proper padding */}
      <div className="h-[700px] mx-auto overflow-auto">
        <div className="px-1 py-1 space-y-6 pb-20">
          <p className="mb-3">Resident Passport</p>

          {/* File upload section with proper spacing */}
          <div className="mb-8 px-1">
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-gray-50">
              <div className="flex justify-center mb-4">
                <AiOutlineCloudUpload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-[#667085] font-opensans">
                Drag and drop file or{' '}
                <button className="text-blue-500 hover:text-blue-600 font-opensans underline cursor-pointer">
                  browse
                </button>
              </p>
            </div>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                e.stopPropagation(); // prevent bubbling to parent form
                e.preventDefault(); // prevent native form submit
                handleSubmit(); // run RHF submission
              }}
            >
              {/* Enhanced form container with padding for focus outlines */}
              <div className="space-y-5 px-1">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <div className="">
                    <FormInput name="name" placeholder="Enter name" />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-medium text-gray-600"
                  >
                    Email address
                  </label>
                  <div className="">
                    <FormInput name="email" placeholder="Enter email" />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Phone Number
                  </label>
                  <div className="">
                    <FormInput name="phone" placeholder="Enter phone" />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="houseNo"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    House No
                  </label>
                  <div className="">
                    <FormInput name="houseNo" placeholder="Enter House No" />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Street Name
                  </label>
                  <div className="">
                    <FormInput name="street" placeholder="Enter Street Name" />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="householdMembers"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Household Members
                  </label>
                  <div className=" mb-3">
                    <FormInput
                      name="houseHoldMembers"
                      placeholder="Enter Household member"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<GoPlus size={16} />}
                    className="rounded-xl py-2"
                  >
                    Add Household Member
                  </Button>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="vehicleDetails"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Vehicle
                  </label>
                  <div className="px-1 mb-3">
                    <FormInput
                      name="vehicleDetails"
                      placeholder="Enter Vehicle Details"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<GoPlus size={16} />}
                    className="rounded-xl py-2"
                  >
                    Add Vehicle
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};

export default EditResidentInformation;
