import { FormProvider, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';
import FormInput from '../forms/FormInput';
import { Button } from '../button/Button';
import SelectButton from '../forms/SelectButton';

type Props = {
  setIsModalOpen: () => void;
  onClose: () => void;
  residentId?: string;
};

type EditFormValues = {
  name: string;
  email: string;
  roles: string;
};

const EditUserModal: React.FC<Props> = ({ setIsModalOpen, onClose }) => {
  const methods = useForm<EditFormValues>({
    defaultValues: {
      name: '',
      email: '',
      roles: '',
    },
  });

  const handleClick = () => {
    setIsModalOpen();
    onClose();
  };

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('user credential:', data);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 w-full border-b border-border px-10 py-6">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Edit User
        </h2>
        <button type="button" onClick={handleClick} className="cursor-pointer">
          <MdOutlineClose className="text-pry" size={20} />
        </button>
      </div>
      <div className="p-10">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Full Name
                </label>
                <div>
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
                <div>
                  <FormInput name="email" placeholder="Enter email" />
                </div>
              </div>

              <SelectButton
                name="roles"
                data={['Super Admin', 'Admin', 'Viewer', 'Developer']}
                label="Role"
                placeholder="Select a role"
              />

              <div className="flex justify-end gap-3 w-full mt-8">
                <Button
                  variant="outline"
                  size="md"
                  className="rounded-lg py-2"
                  onClick={handleClick}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-lg py-2"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditUserModal;
