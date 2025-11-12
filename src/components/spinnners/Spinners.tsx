import { CgSpinner } from 'react-icons/cg';

type SpinnerVariant =
  | 'default'
  | 'dots'
  | 'pulse'
  | 'ring'
  | 'dual-ring'
  | 'bars';
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerColor =
  | 'primary'
  | 'white'
  | 'gray'
  | 'success'
  | 'danger'
  | 'warning';

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
  label?: string;
}

const Spinners: React.FC<SpinnerProps> = ({
  variant = 'default',
  size = 'md',
  color = 'primary',
  className = '',
  label,
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-pry border-blue-600',
    white: 'text-white border-white',
    gray: 'text-gray-600 border-gray-600',
    success: 'text-green-600 border-green-600',
    danger: 'text-red-600 border-red-600',
    warning: 'text-yellow-600 border-yellow-600',
  };

  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];

  const renderSpinner = () => {
    switch (variant) {
      case 'default':
        return (
          <CgSpinner className={`${sizeClass} ${colorClass} animate-spin`} />
        );
      case 'dots':
        return (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${
                  size === 'xs'
                    ? 'w-1.5 h-1.5'
                    : size === 'sm'
                    ? 'w-2 h-2'
                    : size === 'md'
                    ? 'w-2.5 h-2.5'
                    : size === 'lg'
                    ? 'w-3 h-3'
                    : 'w-4 h-4'
                } rounded-full ${colorClass.split(' ')[0]}`}
                style={{
                  animation: 'pulse 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                  backgroundColor: 'currentColor',
                }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${
                  size === 'xs'
                    ? 'w-0.5 h-3'
                    : size === 'sm'
                    ? 'w-0.5 h-4'
                    : size === 'md'
                    ? 'w-1 h-6'
                    : size === 'lg'
                    ? 'w-1 h-8'
                    : 'w-1.5 h-10'
                } rounded ${colorClass.split(' ')[0]}`}
                style={{
                  animation: 'scale 1s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                  backgroundColor: 'currentColor',
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {renderSpinner()}
      {label && (
        <span
          className={`${colorClass.split(' ')[0]} text-pry-light ${
            size === 'xs'
              ? 'text-xs'
              : size === 'sm'
              ? 'text-sm'
              : size === 'md'
              ? 'text-base'
              : size === 'lg'
              ? 'text-lg'
              : 'text-xl'
          }`}
        >
          {label}
        </span>
      )}
      <style>{`
    @keyframes pulse {
      0%, 100% { opacity: 0.4; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1); }
    }
    @keyframes scale {
      0%, 100% { transform: scaleY(0.5); }
      50% { transform: scaleY(1); }
    }
  `}</style>
    </div>
  );
};

export default Spinners;
