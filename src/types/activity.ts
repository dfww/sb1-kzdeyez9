export type ActivityType = 
  | 'facebook_connect' 
  | 'facebook_disconnect' 
  | 'account_linked' 
  | 'account_unlinked'
  | 'draw_completed'
  | 'draw_failed'
  | 'draw_scheduled';

export interface Activity {
  id: string;
  user_id: string;
  type: ActivityType;
  details?: string;
  created_at: string;
}

export interface DrawActivityDetails {
  draw_id: string;
  draw_name: string;
  platform: string;
  page_name: string;
  winner_count: number;
}