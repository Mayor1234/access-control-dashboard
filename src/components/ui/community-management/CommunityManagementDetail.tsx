import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '../button/Button';
import Header from '../header/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import user from '../../../assets/user-profile.png';
import Modal from '../../modal/Modal';
import EditResidentInformation from './EditResidentInformation';

const CommunityManagementDetail = ({
  visitor = {
    name: 'Aniedi Sunday',
    contactInfo: '09056000040',
    emailAddress: 'ekomike247@gmail.com',
    status: 'active',
    houseAddress: 'Family related Issues',
    houseHoldMember: '#Ref5638898',
  },
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center text-sm font-medium text-orange-600 bg-[#FEF3F2] py-1 px-2 rounded-lg">
            <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
            Pending
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center text-sm font-medium text-green-600 bg-green-50 py-1 px-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center text-sm font-medium text-gray-600">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            Inactive
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
      <div className="w-40 text-sm text-[#667085] font-opensans font-medium">
        {label}
      </div>
      <div className="flex-1 text-sm text-pry-text font-opensans font-medium">
        {value}
      </div>
    </div>
  );
  return (
    <div>
      <div className="h-full">
        <Header>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<BiArrowBack size={16} />}
              className="rounded-lg py-2"
              onClick={() => window.history.back()}
            />

            <h2 className="text-xl font-semibold text-pry">
              Community Management
            </h2>
          </div>
        </Header>
      </div>
      <div className="w-full max-w-full mx-auto space-y-6">
        {/* Visitor Information Section */}
        <div className="bg-[#fff] border border-border rounded-lg">
          <div className="px-6 py-3 border-b border-border rounded-t-lg flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <img
                src={user}
                alt="user"
                width={100}
                height={100}
                className="h-14 w-14 rounded-full object-cover cursor-pointer"
              />
              <div>
                <h2 className="mb-1 text-xl font-opensans font-bold">
                  Aniedi Sunday
                </h2>
                <span className="text-sm">
                  {getStatusBadge(visitor.status)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="py-2 rounded-lg"
                leftIcon={<CiEdit size={16} />}
                onClick={() => setIsEditOpen(!isEditOpen)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="md"
                className="py-2 rounded-lg"
                leftIcon={<RiDeleteBin6Line size={16} />}
              >
                Remove
              </Button>
            </div>
            {isEditOpen && (
              <Modal isOpen={isEditOpen}>
                <div className="bg-white text-dark max-w-xl w-full h-full p-10">
                  <EditResidentInformation
                    setIsEditOpen={() => setIsEditOpen(!isEditOpen)}
                  />
                </div>
              </Modal>
            )}
          </div>
          <div className="px-6 py-4">
            <h2 className="font-opensans text-lg text-pry font-medium capitalize mb-3">
              Resident Information
            </h2>
            <div className="space-y-1">
              <InfoRow label="Name" value={visitor.name} />
              <InfoRow label="Contact Info" value={visitor.contactInfo} />
              <InfoRow label="Email Address" value={visitor.emailAddress} />
              <InfoRow label="House Address" value={visitor.houseAddress} />
              <InfoRow
                label="Household Member"
                value={visitor.houseHoldMember}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityManagementDetail;
