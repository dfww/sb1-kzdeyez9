export interface FacebookConfig {
  appId: string;
  version: string;
  sdkOptions: {
    cookie: boolean;
    xfbml: boolean;
    status: boolean;
  };
  permissions: {
    basic: string[];
    pages: string[];
  };
  api: {
    fields: {
      user: string[];
      pages: string[];
      posts: string[];
      comments: string[];
    };
    pagination: {
      defaultLimit: number;
      commentsLimit: number;
    };
  };
  loginOptions: {
    return_scopes: boolean;
    enable_profile_selector: boolean;
    auth_type: string;
  };
}

export interface FacebookSDK {
  init(options: {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
    status?: boolean;
  }): void;
  login(callback: (response: StatusResponse) => void, options?: LoginOptions): void;
  api(path: string, params: object, callback: (response: any) => void): void;
}

export interface StatusResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse?: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
    grantedScopes?: string;
  };
}

export interface LoginOptions {
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  auth_type?: string;
}

// Extend window interface
declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}