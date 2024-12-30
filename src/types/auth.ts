export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  subscription_type: 'free' | 'agent' | 'studio';
  is_active: boolean;
}

export interface BusinessAccount {
  id: string;
  name: string;
  owner_id: string;
}