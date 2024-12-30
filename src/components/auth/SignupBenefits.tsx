import React from 'react';
import { Gift, Zap, Shield, BarChart } from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
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

export const SignupBenefits = () => (
  <div className="hidden lg:block lg:w-1/2 bg-indigo-50 p-12">
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Why Choose The Lucky Potato?
      </h2>
      
      <div className="space-y-8">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex items-start">
            <div className="flex-shrink-0">
              <benefit.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-1 text-gray-500">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
        <blockquote className="text-gray-700 italic">
          "The Lucky Potato has transformed how we run our social media giveaways. It's so easy to use and our followers love the transparency!"
        </blockquote>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
          <p className="text-sm text-gray-500">Social Media Influencer</p>
        </div>
      </div>
    </div>
  </div>
);