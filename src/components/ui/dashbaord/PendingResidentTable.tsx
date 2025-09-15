import type { ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import Table from '../../table/Table';
import { residentsData } from '../../../constants';
import FormCheckbox from '../forms/FormCheckBox';
import MoreActionsDropdown from './MoreActionDropdown';
import Pagination from '../../pagination/Pagination';
import { formatStatusColor } from '../../../shared/helper/formatStatus';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

export type Residents = {
  id: string;
  name: string;
  phone: string;
  street: string;
  status: string;
  more: boolean;
};

const PendingResidentTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: residentsData.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: false,
        }),
        {}
      ),
    },
  });

  const { control, setValue } = methods;
  const selectedPositions = useWatch({ control, name: 'selectedPositions' });

  // Handle select all/deselect all checkbox
  const handleSelectAll = (checked: boolean) => {
    const newSelection = residentsData.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    residentsData.length > 0 &&
    residentsData.every((item) => selectedPositions[item.id]);

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected && residentsData.some((item) => selectedPositions[item.id]);

  const columns: TableColumn<Residents>[] = [
    {
      key: 'name',
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate;
              }
            }}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
          />
          <span>Name</span>
        </div>
      ),
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <FormCheckbox<FormValues>
            name={`selectedPositions.${row.id}`}
            control={methods.control}
          />
          <span className="text-dark-text font-medium font-libre">
            {value as string}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Identification No',
      render: (value) => (
        <span className="text-dark text-sm font-medium font-libre ">
          {value as string}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone Number',
      render: (value) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-dark font-medium font-libre text-sm">
              {value as string}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'street',
      label: 'Street Name',
      render: (value) => (
        <span className="text-dark text-sm font-medium font-libre ">
          {value as string}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Resident Status',
      render: (value) => (
        <span
          className={`text-${
            typeof value === 'string' ? value.toLowerCase() : ''
          } ${formatStatusColor(value as string)} text-xs`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'more',
      label: 'More',
      render: (_, row) => (
        <MoreActionsDropdown
          residentId={row.id}
          residentName={row.name}
          isOpen={openDropdownId === row.id}
          onToggle={() =>
            setOpenDropdownId(openDropdownId === row.id ? null : row.id)
          }
          onClose={() => setOpenDropdownId(null)}
        />
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className="border border-border rounded-xl">
        <div className="mb-5">
          <Table data={residentsData} columns={columns} />
        </div>
        <Pagination
          totalPages={Number(20)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={10}
        />
      </div>
    </FormProvider>
  );
};

export default PendingResidentTable;
