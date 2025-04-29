import React from 'react';
import Select, { MultiValue } from 'react-select';

interface TagOption {
  value: string;
  label: string;
}

interface TagFilterProps {
  onChange: (tags: string[]) => void;
  availableTags: string[];
  selectedTags: string[];
  label?: string;
  placeholder?: string;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  onChange,
  availableTags = [],
  selectedTags = [],
  label = 'Tags',
  placeholder = 'Search and select tags...'
}) => {
  const tagOptions: TagOption[] = availableTags.map(tag => ({
    value: tag,
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  const displayValue: TagOption[] = selectedTags.map(tag => ({
    value: tag,
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  const handleChange = (selected: MultiValue<TagOption>) => {
    const tags = selected ? selected.map(option => option.value) : [];
    onChange(tags);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <Select
        isMulti
        options={tagOptions}
        value={displayValue}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={placeholder}
      />
    </div>
  );
}; 