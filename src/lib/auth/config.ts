export const AUTH_CONFIG = {
  VERIFICATION: {
    ENABLED: true,
    REDIRECT_URL: `${window.location.origin}/auth/callback`,
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // ms
  },
} as const;