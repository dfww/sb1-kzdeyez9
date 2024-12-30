import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const PasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Password", 
  className = "",
  disabled = false 
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-md shadow-sm pr-10
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light
          disabled:bg-gray-50 dark:disabled:bg-gray-800
          disabled:text-gray-500 dark:disabled:text-gray-400
          disabled:border-gray-200 dark:disabled:border-gray-700
          transition-colors
          ${className}
        `}
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" aria-label="Hide password" />
        ) : (
          <Eye className="h-4 w-4" aria-label="Show password" />
        )}
      </button>
    </div>
  );
};