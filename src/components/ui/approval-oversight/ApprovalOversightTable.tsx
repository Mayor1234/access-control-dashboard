import { useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import FormCheckbox from '../forms/FormCheckBox';
import Pagination from '../../pagination/Pagination';
import Table from '../../table/Table';
import { formatStatusColor } from '../../../shared/helper/formatStatus';
import MoreActionsDropdown from './MoreActionDropdown';
import UserStorage from '../../../shared/utils/userStorage';
import { useGetEstateResidentsQuery } from '../../../redux/features/dashboard/dashboardApi';
import type { ResidentAssignment } from '../../../redux/features/dashboard/residentTypes';
// import Spinners from '../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const ApprovalOversightTable = () => {

  const community_admin_id = UserStorage.getUserId() ?? '';

  const { data, isLoading } = useGetEstateResidentsQuery({
    community_admin_id,
  });

  const residentsOversight = (data?.data?.data as ResidentAssignment[]) || [];


  console.log('[Approval Oversight Response]:', residentsOversight)

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

  const columns: TableColumn<ResidentAssignment>[] = [
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
            className="hidden sm:block appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
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
            {`${row.resident.user.first_name} ${row.resident.user.last_name}`}
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
            <span className="text-dark font-medium font-libre text-sm max-w-50 truncate">
              {row.resident.user.id}
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
              {row.resident.user.mobile_number}
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
          {row.resident.user.email}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Resident Status',
      render: (value) => {
        const status = typeof value === 'string' ? value : '';
        return (
          <span className={`${formatStatusColor(status.toLowerCase())} text-xs inline-block`}>
            {status || '-'}
          </span>
        );
      },
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


  return (
    <FormProvider {...methods}>
      <div className="sm:border border-border rounded-xl">
        <div className="mb-5">
          <Table data={residentsOversight} columns={columns}  loading={isLoading}/>
        </div>
        {
          residentsOversight.length > 0 && (
            <Pagination
              totalPages={data?.data?.meta.totalPages ?? 1}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              maxLength={data?.data?.meta.size ?? 10}
            />
          )
        }
      </div>
    </FormProvider>
  );
};

export default ApprovalOversightTable;
