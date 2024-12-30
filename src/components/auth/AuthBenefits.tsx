import React from 'react';
import { Gift, Zap, Shield, BarChart, Key, Clock, Lock } from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const signupBenefits: Benefit[] = [
  {
    icon: Gift,
    title: "Run Fair Giveaways",
    description: "Ensure transparent and random winner selection that builds trust with your audience."
  },
  {
    icon: Zap,
    title: "Save Time",
    description: "Automate comment collection and winner selection - what used to take hours now takes minutes."
  },
  {
    icon: Shield,
    title: "Stay Compliant",
    description: "Our platform helps ensure your giveaways follow platform rules and regulations."
  },
  {
    icon: BarChart,
    title: "Track Growth",
    description: "Monitor engagement and growth with detailed analytics and insights."
  }
];

const loginBenefits: Benefit[] = [
  {
    icon: Key,
    title: "Welcome Back!",
    description: "Access your giveaway dashboard and continue growing your audience."
  },
  {
    icon: Clock,
    title: "Recent Activity",
    description: "View your recent giveaways and winner selections."
  },
  {
    icon: Lock,
    title: "Secure Access",
    description: "Your account is protected with industry-standard security measures."
  }
];

interface AuthBenefitsProps {
  isRegistering: boolean;
}

export const AuthBenefits: React.FC<AuthBenefitsProps> = ({ isRegistering }) => {
  const benefits = isRegistering ? signupBenefits : loginBenefits;
  
  return (
    <div className="hidden lg:block lg:w-1/2 bg-gray-50 dark:bg-gray-800 p-12 transition-colors">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isRegistering 
            ? "Why Choose The Lucky Potato?" 
            : "Welcome to The Lucky Potato"}
        </h2>
        
        <div className="space-y-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start">
              <div className="flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isRegistering && (
          <div className="mt-12 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <blockquote className="text-gray-700 dark:text-gray-300 italic">
              "The Lucky Potato has transformed how we run our social media giveaways. It's so easy to use and our followers love the transparency!"
            </blockquote>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Social Media Influencer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};