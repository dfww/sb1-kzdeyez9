import { type FacebookConfig } from '../types/facebook';

export const facebookConfig: FacebookConfig = {
  // Core settings
  appId: import.meta.env.VITE_FACEBOOK_APP_ID,
  version: 'v18.0',
  
  // SDK initialization options
  sdkOptions: {
    cookie: true,
    xfbml: true,
    status: true
  },
  
  // Permission scopes
  permissions: {
    basic: ['public_profile', 'email'],
    pages: [
      'pages_show_list',
      'pages_read_engagement',
      'pages_read_user_content',
      'pages_manage_engagement'
    ]
  },
  
  // API settings
  api: {
    fields: {
      user: ['id', 'name', 'email'],
      pages: ['id', 'name', 'access_token', 'picture', 'tasks'],
      posts: ['id', 'message', 'created_time', 'permalink_url'],
      comments: ['id', 'message', 'from', 'created_time']
    },
    pagination: {
      defaultLimit: 10,
      commentsLimit: 100
    }
  },
  
  // Login options
  loginOptions: {
    return_scopes: true,
    enable_profile_selector: true,
    auth_type: 'rerequest'
  }
} as const;

// Computed values
export const FACEBOOK_SCOPE = [
  ...facebookConfig.permissions.basic,
  ...facebookConfig.permissions.pages
].join(',');