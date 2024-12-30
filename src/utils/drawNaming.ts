import { format } from 'date-fns';

export const generateDrawName = (): string => {
  return `Draw_${format(new Date(), 'yyyyMMdd_HHmmss')}`;
};