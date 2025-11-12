import { useEffect, useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BiChevronDown } from 'react-icons/bi';
import { MdCheck } from 'react-icons/md';

type Props<T> = {
  name: string;
  data: T[];
  label?: string;
  placeholder?: string;
  className?: string;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  multiple?: boolean; // Add multiple support
};

const SelectButton = <T,>({
  name,
  data,
  label,
  placeholder = 'Select an option',
  className = '',
  getOptionLabel,
  getOptionValue,
  isOptionEqualToValue,
  multiple = false,
}: Props<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { control } = useFormContext();

  const defaultGetOptionLabel = (option: T): string => {
    if (typeof option === 'string') return option;
    if (typeof option === 'number') return String(option);
    if (option && typeof option === 'object') {
      if ('name' in option) return String((option as any).name);
      if ('label' in option) return String((option as any).label);
      if ('title' in option) return String((option as any).title);
    }
    return String(option);
  };

  const defaultGetOptionValue = (option: T): string | number => {
    if (typeof option === 'string' || typeof option === 'number') return option;
    if (option && typeof option === 'object') {
      if ('id' in option) return (option as any).id;
      if ('value' in option) return (option as any).value;
    }
    return defaultGetOptionLabel(option);
  };

  const defaultIsOptionEqualToValue = (option: T, value: T): boolean => {
    if (!value) return false;
    const optionVal = (getOptionValue || defaultGetOptionValue)(option);
    const selectedVal = (getOptionValue || defaultGetOptionValue)(value);
    return optionVal === selectedVal;
  };

  const labelExtractor = getOptionLabel || defaultGetOptionLabel;
  const valueExtractor = getOptionValue || defaultGetOptionValue;
  const equalityChecker = isOptionEqualToValue || defaultIsOptionEqualToValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if option is selected (for multiple)
  const isSelected = (option: T, fieldValue: any) => {
    if (multiple) {
      if (!Array.isArray(fieldValue)) return false;
      return fieldValue.some((val) => equalityChecker(option, val));
    }
    return fieldValue && equalityChecker(option, fieldValue);
  };

  // Handle selection
  const handleSelect = (option: T, fieldValue: any, onChange: any) => {
    if (multiple) {
      const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
      const isAlreadySelected = currentValues.some((val) =>
        equalityChecker(option, val)
      );

      if (isAlreadySelected) {
        // Remove from selection
        onChange(currentValues.filter((val) => !equalityChecker(option, val)));
      } else {
        // Add to selection
        onChange([...currentValues, option]);
      }
    } else {
      onChange(option);
      setIsDropdownOpen(false);
    }
  };

  // Get display text
  const getDisplayText = (fieldValue: any) => {
    if (multiple) {
      if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
        return placeholder;
      }
      if (fieldValue.length === 1) {
        return labelExtractor(fieldValue[0]);
      }
      return `${fieldValue.length} selected`;
    }
    return fieldValue ? labelExtractor(fieldValue) : placeholder;
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-900 text-base mb-2">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-3 py-2.5 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent flex items-center justify-between ${
                  fieldState.error ? 'border-red-500' : 'border-border'
                }`}
              >
                <span
                  className={
                    field.value &&
                    (multiple
                      ? Array.isArray(field.value) && field.value.length > 0
                      : true)
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }
                >
                  {getDisplayText(field.value)}
                </span>
                <BiChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <button
                        key={String(valueExtractor(item))}
                        type="button"
                        onClick={() =>
                          handleSelect(item, field.value, field.onChange)
                        }
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          isSelected(item, field.value)
                            ? 'bg-blue-50 text-active'
                            : 'text-gray-900'
                        }`}
                      >
                        <span>{labelExtractor(item)}</span>
                        {multiple && isSelected(item, field.value) && (
                          <MdCheck className="w-5 h-5 text-active" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No options available
                    </div>
                  )}
                </div>
              )}
            </div>
            {fieldState.error && (
              <p className="mt-1 text-sm text-red-600">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectButton;
