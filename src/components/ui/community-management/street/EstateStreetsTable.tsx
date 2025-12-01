import { useMemo, useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import Table from '../../../table/Table';
import Pagination from '../../../pagination/Pagination';
import FormCheckbox from '../../forms/FormCheckBox';
import { useGetStreetsQuery } from '../../../../redux/features/community-management/communityApi';
import type { GetStreet } from '../../../../redux/features/community-management/communityTypes';
import Spinners from '../../../spinnners/Spinners';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type FormValues = {
  selectedPositions: Record<string, boolean>;
};

const EstateStreetsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: streetRespondData, isLoading } = useGetStreetsQuery();

  const streetData = useMemo(
    () => (streetRespondData?.data?.data as GetStreet[]) || [],
    [streetRespondData?.data?.data]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: streetData.reduce(
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
    const newSelection = streetData.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {}
    );
    setValue('selectedPositions', newSelection);
  };

  // Check if all visible rows are selected
  const allSelected =
    streetData.length > 0 &&
    streetData.every((item) => selectedPositions[item.id]);

  // Check if some (but not all) rows are selected
  const indeterminate =
    !allSelected && streetData.some((item) => selectedPositions[item.id]);

  const columns: TableColumn<GetStreet>[] = [
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
          <span>Street Names</span>
        </div>
      ),
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <FormCheckbox<FormValues>
            name={`selectedPositions.${row.id}`}
            control={methods.control}
          />
          <span className="text-dark-text font-medium font-libre capitalize">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Street Numbers',
      render: (_, value) => (
        <span className="text-[#667085] text-sm font-medium font-libre ">
          {value.starting_number} - {value.ending_number}
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
  if (streetData.length === 0) {
    return (
      <section>
        <div className="border border-border rounded-xl">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8">
            <h3 className="text-lg text-pry-light mb-2">No Street found</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <FormProvider {...methods}>
        <div className="sm:border border-border rounded-xl">
          <div className="mb-5">
            <Table data={streetData} columns={columns} />
          </div>
          <Pagination
            totalPages={streetRespondData?.data.meta.totalPages as number}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxLength={10}
          />
        </div>
      </FormProvider>
    </div>
  );
};

export default EstateStreetsTable;
