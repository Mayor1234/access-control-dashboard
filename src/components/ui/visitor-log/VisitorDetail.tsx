// import { useParams } from 'react-router-dom';

import React from 'react';

import { Button } from '../button/Button';
import { BiArrowBack } from 'react-icons/bi';
import Header from '../header/Header';

interface VisitorInfo {
  name: string;
  phoneNumber: string;
  status: 'upcoming' | 'checked-in' | 'checked-out';
  emailAddress: string;
  purpose: string;
  accessCode: string;
  visitDate: string;
}

interface HostInfo {
  name: string;
  identificationName: string;
  phoneNumber: string;
  emailAddress: string;
  streetName: string;
  buildingNumber: string;
}

interface VisitorInformationProps {
  visitor?: VisitorInfo;
  host?: HostInfo;
}

const VisitorInformation: React.FC<VisitorInformationProps> = ({
  visitor = {
    name: 'Aniedi Sunday',
    phoneNumber: '09056000040',
    status: 'upcoming',
    emailAddress: 'ekomike247@gmail.com',
    purpose: 'Family related Issues',
    accessCode: '#Ref5638898',
    visitDate: '30th August, 2025',
  },
  host = {
    name: 'Telena Daniel Joshua',
    identificationName: "Mantra's Residence Lekki",
    phoneNumber: '08056000040',
    emailAddress: 'Telena47@gmail.com',
    streetName: 'Olusola Agbeji Street',
    buildingNumber: '2A',
  },
}) => {
  //   const { id } = useParams();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center text-sm font-medium text-orange-600 bg-[#FEF3F2] py-1 px-2 rounded-lg">
            <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
            Upcoming Visitor
          </span>
        );
      case 'checked-in':
        return (
          <span className="inline-flex items-center text-sm font-medium text-green-600">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Checked-In
          </span>
        );
      case 'checked-out':
        return (
          <span className="inline-flex items-center text-sm font-medium text-gray-600">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            Checked-Out
          </span>
        );
      default:
        return null;
    }
  };

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
        <div className="bg-[#fff] border border-border rounded-lg">
          <div className="px-6 py-4 border-b border-border rounded-t-lg">
            <h2 className="text-lg font-medium text-pry-text">
              Visitors Information
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-1">
              <InfoRow label="Name" value={visitor.name} />
              <InfoRow label="Phone Number" value={visitor.phoneNumber} />
              <InfoRow label="Status" value={getStatusBadge(visitor.status)} />
              <InfoRow label="Email Address" value={visitor.emailAddress} />
              <InfoRow label="Purpose" value={visitor.purpose} />
              <InfoRow label="Access Code" value={visitor.accessCode} />
              <InfoRow label="Visit Date" value={visitor.visitDate} />
            </div>
          </div>
        </div>

        {/* Host Information Section */}
        <div className="bg-white border border-border rounded-lg">
          <div className="px-6 py-4 border-b border-border rounded-t-lg">
            <h2 className="text-lg font-medium text-pry-text">
              Host Information
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-1">
              <InfoRow label="Name" value={host.name} />
              <InfoRow
                label="Identification Name"
                value={host.identificationName}
              />
              <InfoRow label="Phone Number" value={host.phoneNumber} />
              <InfoRow label="Email Address" value={host.emailAddress} />
              <InfoRow label="Street Name" value={host.streetName} />
              <InfoRow label="Building Number" value={host.buildingNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInformation;
