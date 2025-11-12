import { useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import FormCheckbox from '../forms/FormCheckBox';
import Pagination from '../../pagination/Pagination';
import Table from '../../table/Table';
import { formatStatusColor } from '../../../shared/helper/formatStatus';
import MoreActionsDropdown from './MoreActionDropdown';
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

const ApprovalOversightTable = () => {
  const community_admin_id = UserStorage.getCommunityAdminId() as string;

  const { data, isLoading } = useGetEstateResidentsQuery({
    community_admin_id,
  });

  const residentsOversight = (data?.data?.data as EstateResident[]) || [];

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: residentsOversight.reduce(
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

  const handleSelectAll = (checked: boolean) => {
    const newSelection = residentsOversight.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    residentsOversight.length > 0 &&
    residentsOversight.every((item) => selectedPositions[item.id]);

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected &&
    residentsOversight.some((item) => selectedPositions[item.id]);

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
          <span>Resident Names</span>
        </div>
      ),
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <FormCheckbox<FormValues>
            name={`selectedPositions.${row.id}`}
            control={methods.control}
          />
          <span className="text-dark-text font-medium font-libre">
            {`${row.user.first_name} ${row.user.last_name}`}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Identification No',
      render: (_, row) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-dark font-medium font-libre text-sm max-w-[200px] truncate">
              {row.user.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Phone Number',
      render: (_, row) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-dark font-medium font-libre text-sm">
              {row.user.mobile_number}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Email',
      render: (_, row) => (
        <span className="text-dark text-sm font-medium font-libre">
          {row.user.email}
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
          {value as string}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'More',
      render: (_, row) => (
        <MoreActionsDropdown
          rowData={row}
          community_admin_id={community_admin_id}
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
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinners variant="default" size="xl" color="primary" />
        </div>
      </section>
    );
  }

  // Empty state - no visitors found
  if (residentsOversight.length === 0) {
    return (
      <section>
        <div className="border border-border rounded-xl">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8">
            <svg
              className="w-16 h-16 text-pry-light mb-4"
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
            <h3 className="text-lg text-pry-light mb-2">No Resident found</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="border border-border rounded-xl">
        <div className="mb-5">
          <Table data={residentsOversight} columns={columns} />
        </div>
        <Pagination
          totalPages={data.data?.meta.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={data.data?.meta.size}
        />
      </div>
    </FormProvider>
  );
};

export default ApprovalOversightTable;
