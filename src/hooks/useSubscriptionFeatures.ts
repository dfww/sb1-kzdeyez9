import { useAuthStore } from '../store/authStore';

export const useSubscriptionFeatures = () => {
  const user = useAuthStore(state => state.user);
  
  return {
    canSaveConnections: true, // Always allow connections
    canSaveDrafts: user?.subscription_type !== 'free',
    maxDrawsPerDay: user?.subscription_type === 'free' ? 1 : Infinity,
    hasAdvancedCriteria: user?.subscription_type !== 'free',
    hasScheduledDraws: user?.subscription_type === 'studio',
  };
};