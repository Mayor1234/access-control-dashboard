import type { ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Table from '../../table/Table';
import FormCheckbox from '../forms/FormCheckBox';
import MoreActionsDropdown from './MoreActionDropdown';
import Pagination from '../../pagination/Pagination';
import { formatStatusColor } from '../../../shared/helper/formatStatus';
import UserStorage from '../../../shared/utils/userStorage';
import { useGetEstateResidentsQuery } from '../../../redux/features/dashboard/dashboardApi';
import type { EstateResident } from '../../../redux/features/dashboard/residentTypes';
import Spinners from '../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const PendingResidentTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const community_admin_id = UserStorage.getCommunityAdminId() as string;

  const { data, isLoading } = useGetEstateResidentsQuery({
    community_admin_id,
    status: 'pending',
  });

  const pendingResidents = useMemo(
    () => (data?.data?.data as EstateResident[]) || [],
    [data?.data?.data]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: pendingResidents.reduce(
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
    const newSelection = pendingResidents.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    pendingResidents.length > 0 &&
    pendingResidents.every((item) => selectedPositions[item.id]);

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected && pendingResidents.some((item) => selectedPositions[item.id]);

  const columns: TableColumn<EstateResident>[] = [
    {
      key: 'id',
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
      key: 'id',
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
      key: 'id',
      label: 'Resident Status',
      render: (_, value) => (
        <span
          className={`
           ${formatStatusColor(value.status)} text-xs`}
        >
          {value.status}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'More',
      render: (_, row) => (
        <MoreActionsDropdown
          residentData={row}
          isOpen={openDropdownId === row.id}
          onToggle={() =>
            setOpenDropdownId(openDropdownId === row.id ? null : row.id)
          }
          onClose={() => setOpenDropdownId(null)}
        />
      ),
    },
  ];

  // Loading state - show spinner in a centered container
  if (isLoading) {
    return (
      <section>
        <div className="border border-border rounded-xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinners variant="default" size="xl" color="primary" />
          </div>
        </div>
      </section>
    );
  }

  // Empty state - no visitors found
  if (pendingResidents.length === 0) {
    return (
      <section>
        <div className="border border-border rounded-xl">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8">
            <svg
              className="w-10 h-10 text-pry-light mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-base text-pry-light mb-2">
              No Pending Resident found
            </h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="border border-border rounded-xl">
        <div className="mb-5">
          <Table data={pendingResidents} columns={columns} />
        </div>
        <Pagination
          totalPages={data.data.meta.totalPages as number}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={10}
        />
      </div>
    </FormProvider>
  );
};

export default PendingResidentTable;
