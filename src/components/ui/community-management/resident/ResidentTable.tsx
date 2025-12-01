import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import Pagination from '../../../pagination/Pagination';
import Table from '../../../table/Table';
import FormCheckbox from '../../forms/FormCheckBox';
import { formatStatusColor } from '../../../../shared/helper/formatStatus';
import MoreActionsDropdown from '.././MoreActionsDropdown';
import { useGetEstateResidentsQuery } from '../../../../redux/features/dashboard/dashboardApi';
import UserStorage from '../../../../shared/utils/userStorage';
import type { EstateResident } from '../../../../redux/features/dashboard/residentTypes';
import Spinners from '../../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const ResidentTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const community_admin_id = UserStorage.getCommunityAdminId() as string;

  const { data: residentDataResponse, isLoading } = useGetEstateResidentsQuery({
    community_admin_id,
  });

  const residentData = useMemo(
    () => (residentDataResponse?.data?.data as EstateResident[]) || [],
    [residentDataResponse?.data?.data]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: residentData?.reduce(
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

  // Memoized selection state calculations
  const { allSelected, indeterminate } = useMemo(() => {
    const all =
      residentData.length > 0 &&
      selectedPositions &&
      residentData.every((item) => selectedPositions[item.id]);

    const some =
      !all &&
      selectedPositions &&
      residentData.some((item) => selectedPositions[item.id]);

    return { allSelected: all, indeterminate: some };
  }, [residentData, selectedPositions]);

  // Memoized handler to prevent unnecessary re-renders of child components
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelection = residentData.reduce(
        (acc, item) => ({ ...acc, [item.id]: checked }),
        {}
      );
      setValue('selectedPositions', newSelection);
    },
    [residentData, setValue]
  );

  const columns: TableColumn<EstateResident>[] = useMemo(
    () => [
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
              className="hidden md:block appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
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
        render: (_, value) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-dark font-medium font-libre text-sm">
                {value.user.mobile_number}
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
            data={row}
            isOpen={openDropdownId === row.id}
            onToggle={() =>
              setOpenDropdownId(openDropdownId === row.id ? null : row.id)
            }
            onClose={() => setOpenDropdownId(null)}
          />
        ),
      },
    ],
    [
      allSelected,
      indeterminate,
      handleSelectAll,
      openDropdownId,
      methods.control,
    ]
  );

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
  if (residentData.length === 0) {
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
            <h3 className="text-lg  text-pry-light mb-2">No Resident found</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="sm:border border-border rounded-xl">
        <div className="mb-5">
          <Table data={residentData} columns={columns} />
        </div>
        <Pagination
          totalPages={residentDataResponse?.data.meta.totalPages as number}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={10}
        />
      </div>
    </FormProvider>
  );
};

export default ResidentTable;
