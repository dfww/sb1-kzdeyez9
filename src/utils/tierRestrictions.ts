import { useAuthStore } from '../store/authStore';

export const isFreeUser = (): boolean => {
  const user = useAuthStore.getState().user;
  return user?.subscription_type === 'free';
};

export const TIER_RESTRICTIONS = {
  FREE: {
    canCustomizeName: false,
    maxDrawsPerDay: 1,
    maxConnections: Infinity, // Allow unlimited connections
    canSaveDrafts: false
  },
  AGENT: {
    canCustomizeName: true,
    maxDrawsPerDay: Infinity,
    maxConnections: Infinity,
    canSaveDrafts: true
  },
  STUDIO: {
    canCustomizeName: true,
    maxDrawsPerDay: Infinity,
    maxConnections: Infinity,
    canSaveDrafts: true
  }
} as const;