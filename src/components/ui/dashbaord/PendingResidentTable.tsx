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

  const community_admin_id = UserStorage.getUserId() ?? '';

  const { data, isLoading } = useGetEstateResidentsQuery({
    community_admin_id,
    status: 'pending',
  });

  const pendingResidents = useMemo(
    () => (data?.data?.data as unknown as EstateResident[]) || [],
    [data?.data?.data],
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: pendingResidents.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: false,
        }),
        {},
      ),
    },
  });

  const { control, setValue } = methods;
  const selectedPositions = useWatch({ control, name: 'selectedPositions' });

  // Handle select all/deselect all checkbox
  const handleSelectAll = (checked: boolean) => {
    const newSelection = pendingResidents.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {},
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    pendingResidents.length > 0 &&
    pendingResidents.every((item) => Boolean(selectedPositions?.[item.id]));

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected &&
    pendingResidents.some((item) => Boolean(selectedPositions?.[item.id]));

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
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <FormCheckbox<FormValues>
            name={`selectedPositions.${row.id}`}
            control={methods.control}
          />
          <span className="text-dark-text font-medium font-libre">
            {row.user.first_name} {row.user.last_name}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Email',
      render: (_, row) => (
        <span className="text-dark text-sm font-medium font-libre">
          {row.user.email || 'N/A'}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Phone Number',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <span className="text-dark font-medium font-libre text-sm">
            {row.user.mobile_number || 'N/A'}
          </span>
        </div>
      ),
    },

    {
      key: 'id',
      label: 'Resident Status',
      render: (_, value) => (
        <span className={`${formatStatusColor(value.status)} text-xs`}>
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

  return (
    <FormProvider {...methods}>
      <div className="border border-border rounded-xl">
        <div className="mb-5">
          <Table
            data={pendingResidents}
            columns={columns}
            loading={isLoading}
          />
        </div>
        {pendingResidents.length > 0 && (
          <Pagination
            totalPages={data?.data.meta.totalPages ?? 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxLength={10}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default PendingResidentTable;
