import { Button } from '../button/Button';
import user from '../../../assets/user-profile.png';

import { MdOutlineClose } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';

const ApprovalOversightDetail = ({
  visitor = {
    name: 'Aniedi Sunday',
    contactInfo: '09056000040',
    emailAddress: 'ekomike247@gmail.com',
    status: 'upcoming',
    houseAddress: 'Family related Issues',
    houseHoldMember: '#Ref5638898',
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
      {/* <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<BiArrowBack size={16} />}
            className="rounded-lg py-2"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-semibold text-pry">Approval Oversight</h2>
        </div>
      </Header> */}
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
                <p className="mb-1 text-xl font-opensans font-bold">
                  Aniedi Sunday
                </p>
                <span className="text-sm">
                  {getStatusBadge(visitor.status)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="py-2 rounded-lg"
                leftIcon={<GoPlus size={16} />}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="py-2 rounded-lg"
                leftIcon={<MdOutlineClose size={16} />}
              >
                Decline
              </Button>
            </div>
          </div>
          <div className="px-6 py-4">
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

export default ApprovalOversightDetail;
