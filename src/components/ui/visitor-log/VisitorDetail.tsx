import { useParams } from 'react-router-dom';
import React from 'react';
import { Button } from '../button/Button';
import { useGetEstateInvitesQuery } from '../../../redux/features/visitors-log/visitorsLogApi';
import { useAppSelector } from '../../../redux/app/hook';
import UserStorage from '../../../shared/utils/userStorage';
import type { Invite } from '../../../redux/features/visitors-log/visitorsTypes';
import { formatStatusColor } from '../../../shared/helper/formatStatus';

const VisitorInformation = () => {
  const { id } = useParams();

  const community_admin_id = UserStorage.getCommunityAdminId() as string;
  const community_id = useAppSelector(
    (state) => state.auth.user?.community.id
  ) as string;

  const { data, isLoading, isError, error } = useGetEstateInvitesQuery({
    community_id,
    community_admin_id,
    invite_id: id,
  });

  const invitesData = (data?.data.data[0] as Invite) || null;

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | React.ReactNode;
  }) => (
    <div className="flex py-3">
      <div className="w-40 text-sm text-gray-500 font-medium">{label}</div>
      <div className="flex-1 text-sm text-gray-900 font-medium">{value}</div>
    </div>
  );

  // Skeleton Loader Component
  const InfoRowSkeleton = () => (
    <div className="flex py-3 animate-pulse">
      <div className="w-40">
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-48" />
      </div>
    </div>
  );

  const SectionSkeleton = ({ title }: { title: string }) => (
    <div className="bg-white border border-border">
      <div className="px-6 py-4 border-b border-border rounded-t-lg">
        <h2 className="text-lg font-medium text-pry-text">{title}</h2>
      </div>
      <div className="px-6 py-4">
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <InfoRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<BiArrowBack size={16} />}
            className="rounded-lg py-2"
            onClick={() => window.history.back()}
            disabled={isLoading}
          />
          <h2 className="text-xl font-semibold text-pry">Visitor Details</h2>
        </div>
      </Header> */}

      <div className="w-full max-w-full mx-auto space-y-6 p-6">
        {/* Loading State */}
        {isLoading && (
          <>
            <SectionSkeleton title="Visitors Information" />
            <SectionSkeleton title="Host Information" />
          </>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="bg-white border border-red-200 rounded-lg p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Failed to Load Visitor Details
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {(error as any)?.data?.message ||
                  'An error occurred while fetching visitor information.'}
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => window.location.reload()}
                className="rounded-lg"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && !invitesData && (
          <div className="bg-white border border-border rounded-lg p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Visitor Found
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                The visitor information you're looking for doesn't exist.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => window.history.back()}
                className="rounded-lg"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}

        {/* Success State - Data Display */}
        {!isLoading && !isError && invitesData && (
          <>
            {/* Visitor Information Section */}
            <div className="bg-white border border-border rounded-lg">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-medium text-pry-text">
                  Visitors Information
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-1">
                  <InfoRow label="Name" value={invitesData.name || 'N/A'} />
                  <InfoRow
                    label="Phone Number"
                    value={invitesData.mobile_number || 'N/A'}
                  />
                  <InfoRow
                    label="Number Of Guests"
                    value={invitesData.no_of_guests || 'N/A'}
                  />
                  <div className="flex py-3">
                    <div className="w-40 text-sm text-gray-500 font-medium">
                      Status
                    </div>
                    <div className="flex-1 text-sm text-gray-900 font-medium">
                      <span className={formatStatusColor(invitesData.status)}>
                        {invitesData.status || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <InfoRow
                    label="Purpose"
                    value={invitesData.purpose || 'N/A'}
                  />
                  <InfoRow
                    label="Access Code"
                    value={invitesData.code || 'N/A'}
                  />
                  <InfoRow
                    label="Visit Date"
                    value={invitesData.start_date || 'N/A'}
                  />
                </div>
              </div>
            </div>

            {/* Host Information Section */}
            <div className="bg-white border border-border rounded-lg">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-medium text-pry-text">
                  Host Information
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-1">
                  <InfoRow
                    label="Name"
                    value={invitesData?.user?.first_name || 'N/A'}
                  />
                  <InfoRow
                    label="Phone Number"
                    value={invitesData?.user?.mobile_number || 'N/A'}
                  />
                  <InfoRow
                    label="Email Address"
                    value={invitesData?.user?.email || 'N/A'}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorInformation;
