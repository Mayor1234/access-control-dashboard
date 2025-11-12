import { FormProvider, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import FormInput from '../forms/FormInput';
import { Button } from '../button/Button';
import { GoPlus } from 'react-icons/go';
import { useRef, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ReviewConfirm from './ReviewConfirm';

type Props = {
  setIsEditOpen: () => void;
};

type ResidentFormValues = {
  name: string;
  email: string;
  phone: string;
  houseNo: string;
  street: string;
  householdMembers: string[];
  vehicles: string[];
  passport?: File | null;
};

type Steps = 'Resident Details' | 'Review & Confirm' | 'Success';

const EditResidentInformation: React.FC<Props> = ({ setIsEditOpen }) => {
  const [activeStep, setActiveStep] = useState<Steps>('Resident Details');
  const [images, setImages] = useState<File>();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const methods = useForm<ResidentFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      houseNo: '',
      street: '',
      householdMembers: [''],
      vehicles: [''],
      passport: null,
    },
  });

  //   Add the selected images to the state and generate preview URLs
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages(file);
    setFilePreview(URL.createObjectURL(file));
  };

  // Pick file
  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('login credential:', data);
  });

  return (
    <section className="h-full w-full">
      <div className="flex items-center justify-between mb-5 w-full">
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

      {activeStep === 'Resident Details' && (
        // {/* Enhanced scrollable container with proper padding */}
        <div className="h-screen pb-10 mx-auto overflow-auto no-scrollbar">
          <div className="px-1 py-1 space-y-6 pb-20">
            <p className="mb-3">Resident Passport</p>

            {/* File upload section with proper spacing */}
            <div className="mb-6">
              {filePreview ? (
                <div className="border-2 border-border border-dashed rounded-xl py-2 px-3 text-center bg-gray-50">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="w-16 h-14 rounded-lg overflow-hidden"
                      />
                      <div>
                        <p className="text-sm text-gray-600 mt-1 font-opensans">
                          {images?.name}
                        </p>
                        <p className="text-xs text-gray-500 font-opensans">
                          {((images?.size ?? 0) / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <RiDeleteBin6Line
                      size={20}
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        setFilePreview(null);
                        setImages(undefined);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-xl p-5 text-center bg-gray-50">
                  <div className="flex justify-center items-center mb-2">
                    <AiOutlineCloudUpload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-[#667085] font-opensans">
                    Drag and drop file or{' '}
                    <button
                      className="text-blue-500 hover:text-blue-600 font-opensans underline cursor-pointer"
                      onClick={pickImageHandler}
                    >
                      browse
                      <input
                        ref={filePickerRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </button>
                  </div>
                </div>
              )}
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
                <div className="space-y-5">
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
                      <FormInput
                        name="street"
                        placeholder="Enter Street Name"
                      />
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
            <div className="flex items-center justify-end gap-3 mt-10">
              <Button
                variant="outline"
                size="md"
                className="rounded-xl py-2 px-6"
                onClick={setIsEditOpen}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="rounded-xl py-2 px-6"
                onClick={() => setActiveStep('Review & Confirm')}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      {activeStep === 'Review & Confirm' && (
        <ReviewConfirm
          setActiveStep={() => setActiveStep('Resident Details')}
          images={images as File}
          filePreview={filePreview!}
        />
      )}
    </section>
  );
};

export default EditResidentInformation;
