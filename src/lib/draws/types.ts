import type { Platform } from '../types/draw';

export interface DrawCriteria {
  requireLike: boolean;
  requireComment: boolean;
  requireFollow: boolean;
  commentMustInclude?: string;
  excludedAccounts: string[];
  winnerCount: number;
}

export interface DrawRequest {
  name: string;
  type: 'quick' | 'scheduled';
  platform: Platform;
  pageId: string;
  pageName: string;
  postId: string;
  postUrl: string;
  criteria: DrawCriteria;
}