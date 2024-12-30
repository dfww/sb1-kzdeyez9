// Core Facebook permissions and configuration
export const FACEBOOK_PERMISSIONS = {
  basic: ['public_profile', 'email'],
  pages: [
    'pages_show_list',
    'pages_read_engagement',
    'pages_read_user_content',
    'pages_manage_engagement'
  ]
} as const;

// Computed scope from all permissions
export const FACEBOOK_SCOPE = [
  ...FACEBOOK_PERMISSIONS.basic,
  ...FACEBOOK_PERMISSIONS.pages
].join(',');

export const FACEBOOK_SDK_CONFIG = {
  version: 'v18.0',
  sdkOptions: {
    cookie: true,
    xfbml: true,
    status: true
  }
} as const;

export const FACEBOOK_LOGIN_OPTIONS = {
  scope: FACEBOOK_SCOPE,
  return_scopes: true,
  enable_profile_selector: true,
  auth_type: 'rerequest'
} as const;

export const FACEBOOK_API_FIELDS = {
  user: ['id', 'name', 'email'],
  pages: ['id', 'name', 'access_token', 'picture', 'tasks'],
  posts: ['id', 'message', 'created_time', 'permalink_url'],
  comments: ['id', 'message', 'from', 'created_time']
} as const;