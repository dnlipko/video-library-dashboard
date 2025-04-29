import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  throttleMs?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  throttleMs = 300
}) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const throttledOnChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        onChange(newValue);
      }, throttleMs);
    },
    [onChange, throttleMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => throttledOnChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <HiOutlineSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}; 