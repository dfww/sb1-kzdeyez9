export type DrawStep = 'platform' | 'page' | 'post' | 'criteria' | 'results';
export type Platform = 'facebook' | 'instagram';
export type DrawType = 'quick' | 'scheduled';
export type DrawStatus = 'draft' | 'pending' | 'completed' | 'failed';

export interface DrawCriteria {
  requireLike: boolean;
  requireComment: boolean;
  requireFollow: boolean;
  commentMustInclude?: string;
  excludedAccounts: string[];
  winnerCount: number;
}

export interface Winner {
  id: string;
  name: string;
  comment: string;
  commentId: string;
  commentUrl: string;
}

export interface Draw {
  id: string;
  name: string;
  user_id: string;
  type: DrawType;
  platform: Platform;
  page_id: string;
  page_name: string;
  page_access_token?: string; // Add this field
  post_id: string;
  post_url: string;
  criteria?: DrawCriteria;
  winners?: Winner[];
  status: DrawStatus;
  created_at: string;
}