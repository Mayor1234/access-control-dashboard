type Props = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TabButton: React.FC<Props> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-3 text-sm text-[#667085] font-medium border-b-2 transition-colors duration-100 ease-linear cursor-pointer ${
      isActive
        ? 'text-pry border-pry'
        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {label}
  </button>
);

export default TabButton;
