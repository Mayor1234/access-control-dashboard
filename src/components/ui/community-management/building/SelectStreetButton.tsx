// import { useEffect, useRef, useState } from 'react';
// import { useFormContext, Controller } from 'react-hook-form';
// import { BiChevronDown } from 'react-icons/bi';
// import type { GetStreet } from '../../../../redux/features/community-management/communityTypes';

// type Props = {
//   name: string;
//   data: GetStreet[];
//   label?: string;
//   placeholder?: string;
//   className?: string;
// };

// const SelectStreetButton = ({
//   name,
//   data,
//   label,
//   placeholder = 'Select an option',
//   className = '',
// }: Props) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const { control } = useFormContext();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className={className}>
//       {label && (
//         <label className="block text-gray-900 text-base mb-2">{label}</label>
//       )}
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => (
//           <>
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 type="button"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className={`w-full px-3 py-2.5 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent flex items-center justify-between ${
//                   fieldState.error ? 'border-red-500' : 'border-border'
//                 }`}
//               >
//                 <span
//                   className={field.value ? 'text-gray-900' : 'text-gray-400'}
//                 >
//                   {field.value || placeholder}
//                 </span>
//                 <BiChevronDown
//                   size={20}
//                   className={`text-gray-500 transition-transform ${
//                     isDropdownOpen ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
//                   {data.length > 0 ? (
//                     data.map((item, i) => (
//                       <button
//                         key={i}
//                         type="button"
//                         onClick={() => {
//                           field.onChange(item); // update form value
//                           setIsDropdownOpen(false);
//                         }}
//                         className={`w-full px-3 py- text-left hover:bg-gray-50 transition-colors ${
//                           field.value === item.name
//                             ? 'bg-blue-50 text-active'
//                             : 'text-gray-900'
//                         } ${
//                           fieldState.error ? 'border-red-500' : 'border-border'
//                         }`}
//                       >
//                         {item.name}
//                       </button>
//                     ))
//                   ) : (
//                     <div className="px-4 py-3 text-gray-500 text-center">
//                       No options available
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             {fieldState.error && (
//               <p className="mt-1 text-sm text-red-600">
//                 {fieldState.error.message}
//               </p>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// export default SelectStreetButton;

import { useEffect, useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BiChevronDown } from 'react-icons/bi';
import type { GetStreet } from '../../../../redux/features/community-management/communityTypes';

type Props = {
  name: string;
  data: GetStreet[];
  label?: string;
  placeholder?: string;
  className?: string;
};

const SelectStreetButton = ({
  name,
  data,
  label,
  placeholder = 'Select an option',
  className = '',
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { control } = useFormContext();

  // Close dropdown when clicking outside
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
                  className={field.value ? 'text-gray-900' : 'text-pry-light'}
                >
                  {field.value?.name || placeholder}
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
                        key={item.id}
                        type="button"
                        onClick={() => {
                          field.onChange(item);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          field.value?.id === item.id
                            ? 'bg-blue-50 text-active'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.name}
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

export default SelectStreetButton;
