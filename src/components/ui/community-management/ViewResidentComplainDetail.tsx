import { MdOutlineClose } from 'react-icons/md';
import { Button } from '../button/Button';

type Props = {
  setIsModalOpen: () => void;
  onClose: () => void;
  residentId?: string;
};

interface ResidentComplain {
  errorType: string;
  errorPriority: string;
  errorDescription: string;
  date: string;
  status: string;
  action: string;
}

const residentData: ResidentComplain = {
  errorType: 'Invalid credentials',
  errorPriority: 'low',
  errorDescription: 'username or password is incorrect or has an invalid value',
  date: '29/11/2023, 12:33:09',
  status: 'unresolved',
  action: 'mark as resolved',
};

const ViewResidentComplainDetail: React.FC<Props> = ({
  setIsModalOpen,
  onClose,
  //   residentId,
}) => {
  const handleClick = () => {
    setIsModalOpen();
    onClose();
  };

  const InfoRow: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 font-opensans">
      <span className="text-[#667085] text-sm font-normal">{label}</span>
      <span className="text-pry-text text-sm font-medium text-right max-w-[200px] wrap-normal">
        {value}
      </span>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8 w-full pb-3 border-b border-border">
        <h2 className="font-opensans text-xl text-pry font-medium capitalize">
          Exception Details
        </h2>
        <button type="button" onClick={handleClick} className="cursor-pointer">
          <MdOutlineClose className="text-pry" size={20} />
        </button>
      </div>
      <div className="mb-5">
        <div className="space-y-3 flex flex-col">
          <InfoRow label="ErrorType" value={residentData.errorType} />
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 font-opensans">
            <span className="text-[#667085] text-sm font-normal">
              Error Priority
            </span>
            <span
              className={`text-${
                typeof residentData.errorPriority === 'string'
                  ? residentData.errorPriority.toLowerCase()
                  : ''
              } ${
                residentData.errorPriority === 'high'
                  ? 'text-[#B42318] bg-[#FEF3F2]'
                  : residentData.errorPriority === 'medium'
                  ? 'text-yellow-600'
                  : 'text-green-600 bg-[#ECFDF3]'
              } text-xs capitalize font-medium text-right max-w-[200px] wrap-normal px-3 py-1 rounded-xl`}
            >
              {residentData.errorPriority}
            </span>
          </div>

          <InfoRow
            label="Error Description"
            value={residentData.errorDescription}
          />
          <InfoRow label="Date & time" value={residentData.date} />
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 font-opensans">
            <span className="text-[#667085] text-sm font-normal">Status</span>
            <span
              className={`text-${
                typeof residentData.status === 'string'
                  ? residentData.status.toLowerCase()
                  : ''
              } ${
                residentData.status === 'unresolved'
                  ? 'text-[#B42318] bg-[#FEF3F2]'
                  : 'text-green-600 bg[#ECFDF3]'
              } text-xs capitalize font-medium text-right max-w-[200px] wrap-normal px-3 py-1 rounded-xl`}
            >
              {residentData.status}
            </span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 font-opensans">
            <span className="text-[#667085] text-sm font-normal">Action</span>
            <span className="text-pry-text text-sm font-medium text-right max-w-[200px] wrap-normal">
              <Button
                variant="outline"
                size="md"
                className="rounded-lg py-2 px-3 capitalize"
              >
                {residentData.action}
              </Button>
            </span>
          </div>
          <Button
            variant="primary"
            size="md"
            className="rounded-xl py-2 px-6 self-end mt-3"
            onClick={handleClick}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewResidentComplainDetail;
