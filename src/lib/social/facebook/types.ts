export interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
  grantedScopes?: string;
}

export interface FacebookUserInfo {
  id: string;
  name: string;
  email?: string;
}

export interface FacebookLoginOptions {
  scope: string;
  return_scopes: boolean;
  enable_profile_selector: boolean;
  auth_type: string;
}

export interface FacebookLoginResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse?: FacebookAuthResponse;
}