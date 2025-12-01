import { MdMenu } from 'react-icons/md';

interface MobileMenuToggleProps {
  onClick: () => void;
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden top-6 right-4 z-30 p-2 bg-pry text-white rounded-lg shadow-lg hover:bg-pry-hover transition-colors"
      aria-label="Open menu"
    >
      <MdMenu size={14} />
    </button>
  );
};
