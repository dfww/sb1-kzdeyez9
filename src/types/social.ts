export interface SocialConnection {
  id: string;
  user_id: string;
  platform: 'facebook' | 'instagram';
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  connected_user_name?: string;
  connected_user_id?: string;
  connected_user_email?: string;
  created_at: string;
  updated_at: string;
}