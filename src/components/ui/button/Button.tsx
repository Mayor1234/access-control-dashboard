import { Link } from 'react-router-dom';
import { cn } from '../../../shared/utils/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  href,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseClasses =
    'inline-flex items-center justify-center font-medium font-libre transition-all duration-200 focus:outline-none rounded-full cursor-pointer';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    icon: 'p-2 text-base',
  };

  const variantClasses = {
    primary:
      'bg-button-pry font-libre rounded-full text-light-text hover:bg-button-pry/70 hover:text-light-text',
    secondary: 'bg-[#EEF4FE] text-button-pry',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'border border-border text-[#343942] font-libre rounded-full hover:bg-gray-100 ',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
      ) : (
        leftIcon && <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
};
