import { type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Table from '../../../table/Table';
import Spinners from '../../../spinnners/Spinners';
import {
  useGetBuildingsQuery,
  useGetStreetsQuery,
} from '../../../../redux/features/community-management/communityApi';
import type { GetBuilding } from '../../../../redux/features/community-management/communityTypes';
import { formatStatusColor } from '../../../../shared/helper/formatStatus';
import UserStorage from '../../../../shared/utils/userStorage';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

const StreetDetail = () => {
  const { streetId } = useParams<{ streetId: string }>();
  const navigate = useNavigate();

  const community_id = UserStorage.getCommunityId() ?? '';

  const {
    data: streetsData,
    isLoading: streetsLoading,
    isError: streetsError,
    refetch: refetchStreets,
  } = useGetStreetsQuery(
    { community_id: community_id || '', street_id: streetId },
    { skip: !community_id },
  );
  const street = streetsData?.data?.data[0];

  const {
    data: buildingsData,
    isLoading: buildingsLoading,
    isError: buildingsError,
    refetch: refetchBuildings,
  } = useGetBuildingsQuery(
    { community_id: community_id || '', street_id: streetId },
    { skip: !community_id },
  );

  const buildings = (buildingsData?.data?.data ?? []) as GetBuilding[]; // Assuming the API returns an array of buildings

  const isLoading = streetsLoading || buildingsLoading;
  const isError = streetsError || buildingsError;

  const columns: TableColumn<GetBuilding>[] = [
    {
      key: 'building_number',
      label: 'Building Number',
      render: (_, row) => (
        <span className="text-dark-text font-medium font-libre capitalize">
          {row.building_number || 'N/A'}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Building Description',
      render: (_, row) => (
        <span className="text-dark-text font-medium font-libre capitalize">
          {row.description || 'N/A'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, row) => (
        <span
          className={`text-sm font-medium ${formatStatusColor(row.status)}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date Added',
      render: (_, row) => (
        <span className="text-text-light text-sm font-medium font-libre">
          {row.created_at
            ? new Date(row.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : 'N/A'}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-center min-h-100">
          <Spinners variant="default" size="xl" color="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-white border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load street details
          </h3>
          <button
            onClick={() => {
              refetchStreets();
              refetchBuildings();
            }}
            className="mt-2 text-sm text-pry underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!street) {
    return (
      <div className="p-6">
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Street not found
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 text-sm text-pry underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MdArrowBack size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-pry capitalize">
          {street.name}
        </h2>
      </div>

      {/* Street Info */}
      <div className="bg-white border border-border rounded-lg">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-base font-medium text-pry-text">
            Street Information
          </h3>
        </div>
        <div className="px-6 py-4 space-y-1">
          <InfoRow label="Street Name" value={street.name} />
          <InfoRow
            label="Status"
            value={
              <span
                className={`text-sm font-medium ${formatStatusColor(street.status)}`}
              >
                {street.status}
              </span>
            }
          />
          <InfoRow
            label="Starting Number"
            value={street.starting_number ?? 'N/A'}
          />
          <InfoRow
            label="Ending Number"
            value={street.ending_number ?? 'N/A'}
          />
          <InfoRow label="Community" value={street.community?.name ?? 'N/A'} />
        </div>
      </div>

      {/* Buildings Table */}
      <div className="bg-white border border-border rounded-lg">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-base font-medium text-pry-text">
            Buildings ({buildings.length})
          </h3>
        </div>
        <div className="p-4">
          <Table
            data={buildings}
            columns={columns}
            emptyMessage="No buildings found for this street"
          />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | ReactNode;
}) => (
  <div className="flex py-3 border-b border-border last:border-0">
    <div className="w-40 text-sm text-gray-500 font-medium">{label}</div>
    <div className="flex-1 text-sm text-gray-900 font-medium capitalize">
      {value}
    </div>
  </div>
);

export default StreetDetail;
