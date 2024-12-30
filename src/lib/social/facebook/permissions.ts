// Define all available Facebook permissions
export const FACEBOOK_PERMISSIONS = {
  basic: ['public_profile', 'email'],
  pages: [
    'pages_show_list',
    'pages_read_engagement',
    'pages_read_user_content',
    'pages_manage_engagement'
  ]
} as const;

// Compute the full scope string
export const FACEBOOK_SCOPE = [
  ...FACEBOOK_PERMISSIONS.basic,
  ...FACEBOOK_PERMISSIONS.pages
].join(',');