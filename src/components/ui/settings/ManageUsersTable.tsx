import { useMemo, useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import Table from '../../table/Table';
import Pagination from '../../pagination/Pagination';
import FormCheckbox from '../forms/FormCheckBox';
import { useGetAdminUsersQuery } from '../../../redux/features/settings/settingsApi';

import type { EstateAdminUser } from '../../../redux/features/settings/settingsTypes';
import Spinners from '../../spinnners/Spinners';
import UserStorage from '../../../shared/utils/userStorage';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const ManageUsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const community_user_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';

  const { data, isLoading } = useGetAdminUsersQuery({
    community_user_id,
    community_id,
  });

  const manageUsersData = useMemo(
    () => (data?.data?.data as EstateAdminUser[]) || [],
    [data?.data?.data]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: manageUsersData.reduce(
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

  // Check if all visible rows are selected
  const allSelected =
    manageUsersData.length > 0 &&
    manageUsersData.every((item) => selectedPositions[item.id]);

  const handleSelectAll = (checked: boolean) => {
    const newSelection = manageUsersData.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected && manageUsersData.some((item) => selectedPositions[item.id]);

  const columns: TableColumn<EstateAdminUser>[] = [
    {
      key: 'id',
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate!;
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
            {row.first_name} {row.last_name}
          </span>
        </div>
      ),
    },

    {
      key: 'id',
      label: 'Email Address',
      render: (_, value) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-dark font-medium font-libre text-sm">
              {value.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Role',
      render: (_, value) => (
        <span className="text-dark text-sm font-medium font-libre">
          {value.role.name}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Date Created',
      render: (_, value) => (
        <span className="text-dark text-sm font-medium font-libre">
          {value.created_at}
        </span>
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
  if (manageUsersData.length === 0) {
    return (
      <section>
        <div className="border border-border rounded-xl">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8">
            <h3 className="text-lg text-pry-light mb-2">No Building found</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="border border-border rounded-xl">
        <div className="mb-5">
          <Table data={manageUsersData} columns={columns} />
        </div>
        <Pagination
          totalPages={Number(data?.data.meta.totalPages)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={10}
        />
      </div>
    </FormProvider>
  );
};

export default ManageUsersTable;
