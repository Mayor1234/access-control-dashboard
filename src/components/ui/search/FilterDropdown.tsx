import { MdOutlineClose, MdOutlineCalendarMonth } from 'react-icons/md';
import { Button } from '../button/Button';
import SelectButton from '../forms/SelectButton';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  onClose: () => void;
};

type FormValue = {
  roles: string;
};
const FilterDropdown: React.FC<Props> = ({ onClose }) => {
  const methods = useForm<FormValue>({
    defaultValues: {
      roles: '',
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('user credential:', data);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 w-full border-b border-border px-5 py-3">
        <h2 className="font-opensans text-lg text-pry font-medium capitalize">
          Filter
        </h2>
        <button type="button" onClick={onClose} className="cursor-pointer">
          <MdOutlineClose className="text-pry" size={20} />
        </button>
      </div>
      <div className="space-y-6 flex flex-col px-5">
        <div className="text-sm text-pry-text">
          <div className="flex justify-between items-center w-full mb-2">
            <p>Date range</p>
            <button type="button" className="text-[#2B2AC7]">
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs px-3 text-[#667085]"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs px-3 text-[#667085]"
            >
              Last 7 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs px-3 text-[#667085]"
            >
              30 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs px-3 text-[#667085]"
            >
              1 year
            </Button>
          </div>
        </div>
        <div className="text-sm text-pry-text">
          <div className="flex justify-between items-center w-full mb-2">
            <p>Custom Date range</p>
            <button type="button" className="text-[#2B2AC7]">
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs px-3 text-[#667085]"
              leftIcon={<MdOutlineCalendarMonth size={16} />}
            >
              Start Date
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs text-[#667085]"
              leftIcon={<MdOutlineCalendarMonth size={16} />}
            >
              End Date
            </Button>
          </div>
        </div>
        <div className="text-sm text-pry-text w-full">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center w-full mb-2">
                <p>Role</p>
                <button type="button" className="text-[#2B2AC7]">
                  Reset
                </button>
              </div>
              <SelectButton
                name="roles"
                data={['Super Admin', 'Admin', 'Viewer', 'Developer']}
                placeholder="Select a role"
              />
            </form>
          </FormProvider>
        </div>
        <div className="self-end space-x-5">
          <Button variant="outline" size="md" className="rounded-lg px-3">
            Clear
          </Button>
          <Button variant="primary" size="md" className="rounded-lg px-3">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
