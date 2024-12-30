import { fbApiCall } from '../sdk';
import type { FacebookUserInfo } from '../types';

export const getUserInfo = async (): Promise<FacebookUserInfo> => {
  return fbApiCall('/me', { fields: 'id,name,email' });
};