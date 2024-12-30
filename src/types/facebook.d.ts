declare namespace fb {
  // ... existing interfaces ...

  interface TokenResponse {
    access_token?: string;
    expires_in?: number;
    error?: {
      message: string;
      type: string;
      code: number;
    };
  }
}