export const facebookConfig = {
  appId: import.meta.env.VITE_FACEBOOK_APP_ID,
  version: 'v18.0',
  
  permissions: {
    basic: ['public_profile', 'email'],
    pages: [
      'pages_show_list',
      'pages_read_engagement',
      'pages_read_user_content',
      'pages_manage_engagement'
    ]
  },

  sdkOptions: {
    cookie: true,
    xfbml: true,
    status: true
  }
} as const;