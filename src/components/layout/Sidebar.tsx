import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gift, Calendar, History, Settings, Users, Share2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Logo } from '../landing/Logo';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  const navigation = [
    { name: 'Dashboard', icon: Home, href: '/app' },
    { name: 'Draws', icon: Gift, href: '/app/draws' },
    { name: 'History', icon: History, href: '/app/history' },
    { name: 'Connections', icon: Share2, href: '/app/connections' },
    { name: 'Settings', icon: Settings, href: '/app/settings' },
  ];

  if (user?.role === 'admin') {
    navigation.push({ name: 'User Management', icon: Users, href: '/app/admin/users' });
  }

  return (
    <div className="w-64 bg-gray-900 dark:bg-black">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-4 bg-gray-800 dark:bg-gray-900">
          <Logo />
          <span className="ml-3 text-lg font-display font-semibold text-white">
            The Lucky Potato
          </span>
        </div>
        <nav className="mt-5 flex-1">
          <div className="px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};