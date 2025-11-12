import { Button } from '../button/Button';

interface ResidentData {
  name: string;
  email: string;
  phoneNumber: string;
  emergencyNumber: string;
  houseNo: string;
  street: string;
  estate: string;
  state: string;
  householdMember: string;
  attachment: {
    fileName: string;
    fileSize: string;
    type: 'image' | 'document';
  };
}

const residentData: ResidentData = {
  name: 'Aniedi Sunday',
  email: 'Anied1247@gmail.com',
  phoneNumber: '09012345678',
  emergencyNumber: '09012345678',
  houseNo: 'No 22A',
  street: 'Nehita Street, Divine homes',
  estate: 'Thomas Estate',
  state: 'Lagos',
  householdMember: 'Ememobong',
  attachment: {
    fileName: 'an-image-file-with-a-ver-random-file-name.jpg',
    fileSize: '797.56 KB',
    type: 'image',
  },
};

type Props = {
  images: File;
  filePreview: string;
  setActiveStep: () => void;
};

const ReviewConfirm: React.FC<Props> = ({
  setActiveStep,
  images,
  filePreview,
}) => {
  const InfoRow: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 font-opensans">
      <span className="text-[#667085] text-sm font-normal">{label}</span>
      <span className="text-pry-text text-sm font-medium text-right max-w-xs truncate">
        {value}
      </span>
    </div>
  );

  return (
    <div className="h-screen pb-10 mx-auto overflow-auto no-scrollbar">
      {/* Resident Information Section */}
      <div className="px-1 py-1 space-y-6 pb-20">
        <div className="mb-5">
          <h2 className="font-medium text-pry-text mb-5">
            Confirm Edited Resident Information
          </h2>
          <div className="space-y-0">
            <InfoRow label="Name" value={residentData.name} />
            <InfoRow label="Email Address" value={residentData.email} />
            <InfoRow label="Phone Number" value={residentData.phoneNumber} />
            <InfoRow
              label="Emergency Number"
              value={residentData.emergencyNumber}
            />
            <InfoRow label="House No" value={residentData.houseNo} />
            <InfoRow label="Street" value={residentData.street} />
            <InfoRow label="Estate" value={residentData.estate} />
            <InfoRow label="State" value={residentData.state} />
            <InfoRow
              label="Name of One Household Member"
              value={residentData.householdMember}
            />
          </div>
        </div>
        {/* Attachment Section */}
        <div>
          <h2 className="font-medium text-pry-text mb-3">Attachment</h2>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <img
                src={filePreview}
                alt="Preview"
                className="w-16 h-14 rounded-lg overflow-hidden"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 mb-1 font-opensans">
                  {images?.name}
                </p>
                <p className="text-xs text-gray-500 font-opensans">
                  {((images?.size ?? 0) / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="md"
            className="rounded-xl py-2 px-6"
            onClick={setActiveStep}
          >
            Back
          </Button>
          <Button variant="primary" size="md" className="rounded-xl py-2 px-6">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirm;
