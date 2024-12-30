import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${
          i18n.language === 'en' 
            ? 'bg-primary text-white' 
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('da')}
        className={`px-2 py-1 rounded ${
          i18n.language === 'da' 
            ? 'bg-primary text-white' 
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        DA
      </button>
    </div>
  );
};