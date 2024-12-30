import { AuthError } from '@supabase/supabase-js';

export const AUTH_ERROR_CODES = {
  RATE_LIMIT: 'over_email_send_rate_limit',
  USER_NOT_FOUND: 'user_not_found',
  UNVERIFIED: 'email_not_confirmed',
} as const;

// Map API error codes to user-friendly messages
export const getAuthErrorMessage = (error: AuthError | Error | unknown): string => {
  if (!error) return 'An unexpected error occurred. Please try again.';

  // Handle AuthError
  if ('code' in (error as AuthError)) {
    const code = (error as AuthError).code;
    const errorMessages: Record<string, string> = {
      [AUTH_ERROR_CODES.RATE_LIMIT]: 'Too many attempts. Please wait a few minutes before trying again.',
      [AUTH_ERROR_CODES.USER_NOT_FOUND]: 'Invalid email or password. Please try again.',
      [AUTH_ERROR_CODES.UNVERIFIED]: 'Please verify your email address before signing in.',
      'user_already_exists': 'An account with this email already exists. Please sign in instead.',
      'invalid_credentials': 'Invalid email or password. Please try again.',
      'invalid_email': 'Please enter a valid email address.',
      'weak_password': 'Password is too weak. Please use at least 6 characters.',
      '422': 'An account with this email already exists but needs verification. Please check your email.',
    };

    return errorMessages[code] || error.message || 'An unexpected error occurred. Please try again.';
  }

  // Handle standard Error
  if (error instanceof Error) {
    if (error.message.includes('email')) {
      return 'Please check your email to verify your account.';
    }
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};