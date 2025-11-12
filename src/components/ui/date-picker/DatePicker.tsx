import React, { useState, useRef, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Button } from '../button/Button';
import { FaRegCalendarMinus } from 'react-icons/fa6';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  error,
  disabled = false,
  minDate,
  maxDate,
  className = '',
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(today, date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!isDateDisabled(selectedDate)) {
      onChange(selectedDate);
      setIsOpen(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected = value && isSameDay(value, date);
      const isCurrentDay = isToday(date);
      const isDisabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            h-8 w-8 rounded-lg text-sm font-medium transition-colors
            ${
              isSelected
                ? 'bg-pry text-white hover:bg-pry-text'
                : isCurrentDay
                ? 'bg-blue-50 text-pry hover:bg-pry-light hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }
            ${
              isDisabled
                ? 'opacity-40 cursor-not-allowed hover:bg-transparent'
                : 'cursor-pointer'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-pry-text">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          leftIcon={<FaRegCalendarMinus size={16} />}
          disabled={disabled}
          className={`
            w-full text-left bg-white border rounded-xl
            flex items-center justify-between transition-colors py-2
            ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }
            ${
              disabled
                ? 'bg-gray-100 cursor-not-allowed opacity-60'
                : 'hover:border-gray-400 cursor-pointer'
            }

          `}
        >
          <span
            className={value ? 'text-pry tracking-wider' : 'text-pry-light'}
          >
            {value ? formatDate(value) : placeholder}
          </span>
        </Button>

        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BiChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <span className="text-sm font-semibold text-gray-900">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BiChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysInWeek.map((day) => (
                <div
                  key={day}
                  className="h-2 w-2 flex items-center justify-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

            {/* Quick actions */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  if (!isDateDisabled(today)) {
                    onChange(today);
                    setIsOpen(false);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};
