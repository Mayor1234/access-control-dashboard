import { useMemo, useState, type ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { GetBuilding } from '../../../../redux/features/community-management/communityTypes';
import FormCheckbox from '../../forms/FormCheckBox';
import {
  useDeleteBuildingMutation,
  useGetBuildingsQuery,
} from '../../../../redux/features/community-management/communityApi';
import { formatStatusColor } from '../../../../shared/helper/formatStatus';
import Pagination from '../../../pagination/Pagination';
import Table from '../../../table/Table';
import Spinners from '../../../spinnners/Spinners';
import UserStorage from '../../../../shared/utils/userStorage';
import Modal from '../../../modal/Modal';
import EditBuilding from './EditBuilding';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

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
  const [editingBuilding, setEditingBuilding] = useState<GetBuilding | null>(
    null,
  );
  const [deletingBuilding, setDeletingBuilding] = useState<GetBuilding | null>(
    null,
  );

  const community_id = UserStorage.getCommunityId() ?? '';
  const community_user_id = UserStorage.getUserId() ?? '';

  const { data, isLoading } = useGetBuildingsQuery({ community_id });
  const [deleteBuilding, { isLoading: isDeleting }] =
    useDeleteBuildingMutation();

  const buildingResponseData = useMemo(
    () => (data?.data?.data as GetBuilding[]) || [],
    [data?.data?.data],
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedPositions: buildingResponseData?.reduce(
        (acc, item) => ({ ...acc, [item.id]: false }),
        {},
      ),
    },
  });

  const { control, setValue } = methods;
  const selectedPositions = useWatch({ control, name: 'selectedPositions' });

  const handleSelectAll = (checked: boolean) => {
    const newSelection = buildingResponseData.reduce(
      (acc, item) => ({ ...acc, [item.id]: checked }),
      {},
    );
    setValue('selectedPositions', newSelection);
  };

  const allSelected =
    buildingResponseData.length > 0 &&
    buildingResponseData.every((item) => selectedPositions[item.id]);

  const indeterminate =
    !allSelected &&
    buildingResponseData.some((item) => selectedPositions[item.id]);

  const handleDelete = async () => {
    if (!deletingBuilding) return;
    try {
      const response = await deleteBuilding({
        building_id: deletingBuilding.id,
        community_id,
        community_user_id,
      }).unwrap();
      if (response.status === 'success') {
        toast.success(response.message);
      }
    } catch {
      toast.error('Failed to delete building. Please try again.');
    } finally {
      setDeletingBuilding(null);
    }
  };

  const columns: TableColumn<GetBuilding>[] = [
    {
      key: 'id',
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected || false}
            ref={(input) => {
              if (input) input.indeterminate = indeterminate || false;
            }}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="hidden md:block appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
          />
          <span>Street Name</span>
        </div>
      ),
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div onClick={(e) => e.stopPropagation()}>
            <FormCheckbox<FormValues>
              name={`selectedPositions.${row.id}`}
              control={methods.control}
            />
          </div>
          <span className="text-dark-text font-medium font-libre capitalize">
            {row.street.name}
          </span>
        </div>
      ),
    },
    {
      key: 'building_number',
      label: 'Building Number',
      render: (_, value) => (
        <div className="flex items-center gap-2">
          <span className="text-dark font-medium font-libre text-sm inline-block max-w-50 truncate">
            {value.building_number ?? 'N/A'}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Description',
      render: (_, value) => (
        <span className="text-dark text-sm font-medium font-libre inline-block truncate max-w-50">
          {value.description}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, value) => (
        <span className={`${formatStatusColor(value.status)} text-xs`}>
          {value.status}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setEditingBuilding(row)}
            className="text-gray-400 hover:text-pry transition-colors"
            title="Edit building"
          >
            <MdOutlineEdit size={18} />
          </button>
          <button
            onClick={() => setDeletingBuilding(row)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Delete building"
          >
            <MdOutlineDelete size={18} />
          </button>
        </div>
      ),
    },
  ];


  return (
    <section>
      <FormProvider {...methods}>
        <div className="sm:border border-border rounded-xl">
          <div className="mb-5">
            <Table data={buildingResponseData} columns={columns} loading={isLoading} />
          </div>

          {
           buildingResponseData.length > 0 && (
             <Pagination
               totalPages={data?.data.meta.totalPages ?? 1}
               currentPage={currentPage}
               onPageChange={setCurrentPage}
               maxLength={10}
             />
           )
        }
         
        </div>
      </FormProvider>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingBuilding}
        onClose={() => setEditingBuilding(null)}
      >
        <div className="bg-white text-dark max-w-lg w-full h-full p-10">
          {editingBuilding && (
            <EditBuilding
              building={editingBuilding}
              onClose={() => setEditingBuilding(null)}
            />
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      {deletingBuilding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-pry-text/60"
            onClick={() => setDeletingBuilding(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-8 w-full max-w-sm mx-4 z-10">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mb-4">
              <MdOutlineDelete size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Building
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete building{' '}
              <span className="font-medium text-gray-800">
                {deletingBuilding.building_number ||
                  deletingBuilding.description}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingBuilding(null)}
                className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <Spinners variant="dots" size="sm" color="white" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BuildingTable;
