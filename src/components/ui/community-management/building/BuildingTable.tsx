import { useMemo, useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { GetBuilding } from '../../../../redux/features/community-management/communityTypes';
import FormCheckbox from '../../forms/FormCheckBox';
import { useGetBuildingsQuery } from '../../../../redux/features/community-management/communityApi';
import { useAppSelector } from '../../../../redux/app/hook';
import { formatStatusColor } from '../../../../shared/helper/formatStatus';
import Pagination from '../../../pagination/Pagination';
import Table from '../../../table/Table';
// import MoreActionsDropdown from '.././MoreActionsDropdown';
import Spinners from '../../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const BuildingTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const community = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useGetBuildingsQuery({
    community_id: community?.community.id as string,
  });

  const buildingResponseData = useMemo(
    () => (data?.data?.data as GetBuilding[]) || [],
    [data?.data?.data]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: buildingResponseData?.reduce(
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
    const newSelection = buildingResponseData.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    buildingResponseData.length > 0 &&
    buildingResponseData.every((item) => selectedPositions[item.id]);

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected &&
    buildingResponseData.some((item) => selectedPositions[item.id]);

  const columns: TableColumn<GetBuilding>[] = [
    {
      key: 'id',
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected || false}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate || false;
              }
            }}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="hidden md:block appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
          />
          <span>Resident Name</span>
        </div>
      ),
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <FormCheckbox<FormValues>
            name={`selectedPositions.${row.id}`}
            control={methods.control}
          />
          <span className="text-dark-text font-medium font-libre capitalize">
            {row.street.name}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Identification No',
      render: (_, value) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-dark font-medium font-libre text-sm inline-block max-w-[200px] truncate">
              {value.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Description',
      render: (_, value) => (
        <span className="text-dark text-sm font-medium font-libre inline-block truncate max-w-[200px]">
          {value.description}
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
  if (buildingResponseData.length === 0) {
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
    <section>
      <FormProvider {...methods}>
        <div className="sm:border border-border rounded-xl">
          <div className="mb-5">
            <Table data={buildingResponseData} columns={columns} />
          </div>
          <Pagination
            totalPages={data?.data.meta.totalPages as number}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxLength={10}
          />
        </div>
      </FormProvider>
    </section>
  );
};

export default BuildingTable;
