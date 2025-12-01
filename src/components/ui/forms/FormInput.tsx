import React, { useEffect, useRef, useState } from 'react';
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
  type Control,
} from 'react-hook-form';
import { cn } from '../../../shared/utils/cn';
import { RiEyeOffFill } from 'react-icons/ri';
import { IoEyeSharp } from 'react-icons/io5';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  showPasswordToggle?: boolean;
};

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  iconLeft,
  iconRight,
  className,
  showPasswordToggle = false, // Default to false
}: FormInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control: contextControl,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors?.[name]?.message as string;

  // Determine if we should show the password toggle
  const isPasswordField = type === 'password';
  const shouldShowToggle = isPasswordField && showPasswordToggle;

  // Determine the actual input type
  const inputType = isPasswordField && showPassword ? 'text' : type;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-dark">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-icon">
            {iconLeft}
          </div>
        )}
        <Controller
          name={name}
          control={control ?? contextControl}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              ref={inputRef}
              type={inputType}
              placeholder={placeholder}
              autoComplete="off"
              className={cn(
                'w-full px-3 py-2.5 text-[#343942] placeholder:text-[#A6A6A6] font-mulish border border-border rounded-lg transition-all duration-300 ease-linear focus:outline-none focus:ring focus:ring-active focus:border-active',
                iconLeft ? 'pl-10' : '',
                shouldShowToggle || iconRight ? 'pr-10' : '', // Add padding for toggle or iconRight
                error && 'border-red-500',
                className
              )}
            />
          )}
        />

        {/* Password Toggle - Takes precedence over iconRight */}
        {shouldShowToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pry-light hover:text-pry transition-colors ease-linear cursor-pointer focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <RiEyeOffFill className="h-5 w-5" />
            ) : (
              <IoEyeSharp className="h-5 w-5" />
            )}
          </button>
        ) : (
          iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-icon">
              {iconRight}
            </div>
          )
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
