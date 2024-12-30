import React from 'react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  checked,
  onChange,
  disabled = false
}) => (
  <div className="flex items-center">
    <input
      id="remember-me"
      name="remember-me"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="h-4 w-4 text-primary focus:ring-primary dark:focus:ring-primary-light border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
    />
    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
      Remember me
    </label>
  </div>
);