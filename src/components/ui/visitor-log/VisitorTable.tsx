import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useState, useMemo, useCallback, type ReactNode } from 'react';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/pagination/Pagination';
import FormCheckbox from '../../../components/ui/forms/FormCheckBox';
import { formatStatusColor } from '../../../shared/helper/formatStatus';
import MoreActionsDropdown from './MoreActionDropdown';
import type { Invite } from '../../../redux/features/visitors-log/visitorsTypes';
import Spinners from '../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

type Props = {
  filteredVisitors: Invite[];
  totalPages: number;
  isLoading: boolean;
};

const VisitorTable: React.FC<Props> = ({
  filteredVisitors,
  totalPages,
  isLoading,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize visitors data
  const visitors = useMemo(() => filteredVisitors, [filteredVisitors]);

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: visitors.reduce(
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

  // Memoized handlers
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelection = visitors.reduce(
        (acc, item) => ({ ...acc, [item.id]: checked }),
        {}
      );
      setValue('selectedPositions', newSelection);
    },
    [visitors, setValue]
  );

  const handleDropdownToggle = useCallback(
    (id: string) => {
      setOpenDropdownId(openDropdownId === id ? null : id);
    },
    [openDropdownId]
  );

  const handleDropdownClose = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  // Memoized selection state
  const { allSelected, indeterminate } = useMemo(() => {
    const all =
      visitors.length > 0 &&
      selectedPositions &&
      visitors.every((item) => selectedPositions[item.id]);

    const some =
      !all &&
      selectedPositions &&
      visitors.some((item) => selectedPositions[item.id]);

    return { allSelected: all, indeterminate: some };
  }, [visitors, selectedPositions]);

  // Memoized columns
  const columns: TableColumn<Invite>[] = useMemo(
    () => [
      {
        key: 'id',
        // hideOnMobile: true,
        // mobileLabel: 'Visitors Name',
        label: (
          <div className="flex items-center sm:gap-3">
            <input
              type="checkbox"
              checked={allSelected || false}
              ref={(input) => {
                if (input) {
                  input.indeterminate = indeterminate || false;
                }
              }}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="hidden sm:block appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
            />
            <span>Visitors Name</span>
          </div>
        ),
        render: (_, value) => (
          <div className="flex items-center sm:gap-3">
            <FormCheckbox<FormValues>
              name={`selectedPositions.${value.id}`}
              control={methods.control}
            />
            <span className="text-dark-text font-medium font-libre">
              {value.name}
            </span>
          </div>
        ),
      },
      {
        key: 'id',
        label: 'Access Code',
        render: (_, value) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-dark font-medium font-libre text-sm">
                {value.code}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'id',
        label: 'Host Name',
        render: (_, value) => (
          <span className="text-dark text-sm font-medium font-libre">
            {value.user.first_name}
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
      {
        key: 'status',
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
        hideOnMobile: true,
        render: (_, row) => (
          <MoreActionsDropdown
            residentId={row.id}
            residentName={row.name}
            isOpen={openDropdownId === row.id}
            onToggle={() => handleDropdownToggle(row.id)}
            onClose={handleDropdownClose}
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
      handleDropdownToggle,
      handleDropdownClose,
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
  if (visitors.length === 0) {
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
            <h3 className="text-lg text-pry-light mb-2">No visitors found</h3>
          </div>
        </div>
      </section>
    );
  }

  // Main content - show table with data
  return (
    <FormProvider {...methods}>
      <div className="sm:border border-border rounded-xl">
        <div className="mb-5">
          <Table data={visitors} columns={columns} loading={isLoading} />
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxLength={10}
        />
      </div>
    </FormProvider>
  );
};

export default VisitorTable;
