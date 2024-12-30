import { useState, useEffect } from 'react';
import { generateDrawName } from '../utils/drawNaming';
import { isFreeUser } from '../utils/tierRestrictions';

export const useDrawNaming = () => {
  const [drawName, setDrawName] = useState('');
  const userIsFree = isFreeUser();

  useEffect(() => {
    // Always generate initial name
    setDrawName(generateDrawName());
  }, []);

  const updateDrawName = (name: string) => {
    // Prevent custom naming for free users
    if (userIsFree) {
      return;
    }
    setDrawName(name);
  };

  return {
    drawName,
    setDrawName: updateDrawName,
    isNameEditable: !userIsFree
  };
};