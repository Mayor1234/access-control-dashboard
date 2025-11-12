import { useParams } from 'react-router-dom';

import React from 'react';

import { Button } from '../button/Button';
import { BiArrowBack } from 'react-icons/bi';
import Header from '../header/Header';
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

  const { data } = useGetEstateInvitesQuery({
    community_id,
    community_admin_id,
    invite_id: id,
  });

  const invitesData = (data?.data.data[0] as Invite) || [];

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | React.ReactNode;
  }) => (
    <div className="flex py-3">
      <div className="w-40 text-sm text-gray-500 font-medium">{label}</div>
      <div className={`flex-1 text-sm text-gray-900 font-medium`}>{value}</div>
    </div>
  );

  return (
    <div>
      <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<BiArrowBack size={16} />}
            className="rounded-lg py-2"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-semibold text-pry">Visitor Details</h2>
        </div>
      </Header>
      <div className="w-full max-w-full mx-auto space-y-6">
        {/* Visitor Information Section */}
        <div className="bg-[#fff] border border-border">
          <div className="px-6 py-4 border-b border-border rounded-t-lg">
            <h2 className="text-lg font-medium text-pry-text">
              Visitors Information
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-1">
              <InfoRow label="Name" value={invitesData.name} />
              <InfoRow label="Phone Number" value={invitesData.mobile_number} />
              <InfoRow
                label="Number Of Guests"
                value={invitesData.no_of_guests}
              />
              <InfoRow
                label="Status"
                value={formatStatusColor(invitesData.status)}
              />
              <InfoRow label="Purpose" value={invitesData.purpose} />
              <InfoRow label="Access Code" value={invitesData.code} />
              <InfoRow label="Visit Date" value={invitesData.start_date} />
            </div>
          </div>
        </div>

        {/* Host Information Section */}
        <div className="bg-white border border-border">
          <div className="px-6 py-4 border-b border-border rounded-t-lg">
            <h2 className="text-lg font-medium text-pry-text">
              Host Information
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-1">
              <InfoRow label="Name" value={invitesData?.user?.first_name} />
              <InfoRow
                label="Phone Number"
                value={invitesData?.user?.mobile_number}
              />
              <InfoRow label="Email Address" value={invitesData?.user?.email} />
              {/* <InfoRow label="Street Name" value={invitesData.streetName} /> */}
              {/* <InfoRow label="Building Number" value={invitesData.buildingNumber} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInformation;
