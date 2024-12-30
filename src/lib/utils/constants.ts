export const AUTH_DELAY = 1000; // ms to wait for auth triggers

export const LOG_LEVELS = {
  DEBUG: 'debug',
  ERROR: 'error',
  INFO: 'info',
  WARN: 'warn',
} as const;

export type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];