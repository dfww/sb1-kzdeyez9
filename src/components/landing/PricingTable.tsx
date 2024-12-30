import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out our service',
    features: [
      'Up to 3 giveaways per month',
      'Basic winner selection',
      'Manual comment fetching',
      'Email support'
    ],
    buttonText: 'Start Free'
  },
  {
    name: 'Agent',
    price: '$29',
    description: 'For growing creators and small businesses',
    features: [
      'Unlimited giveaways',
      'Advanced winner filtering',
      'Automatic comment fetching',
      'Priority support',
      'Custom branding',
      'Analytics dashboard'
    ],
    buttonText: 'Start Trial',
    highlighted: true
  },
  {
    name: 'Studio',
    price: '$99',
    description: 'For agencies and large businesses',
    features: [
      'Everything in Agent, plus:',
      'Multiple team members',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Enterprise-grade security'
    ],
    buttonText: 'Contact Sales'
  }
];

export const PricingTable = () => (
  <section className="bg-gray-50 dark:bg-gray-900 transition-colors">
    <Container className="py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Choose the plan that's right for you
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-lg shadow-lg overflow-hidden ${
              tier.highlighted 
                ? 'bg-white dark:bg-gray-800 ring-2 ring-primary' 
                : 'bg-gray-50 dark:bg-gray-800'
            } transition-colors`}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tier.name}
              </h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {tier.price}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  to="/register"
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base font-medium transition-colors ${
                    tier.highlighted
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-white dark:bg-gray-700 text-primary dark:text-white border border-primary hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {tier.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);