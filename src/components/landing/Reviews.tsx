import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '../common/Container';

interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    title: "Game Changer for My Giveaways",
    text: "This tool has made running Instagram giveaways so much easier. The random selection is fair and transparent, and my followers love it!",
    author: "Sarah Johnson",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    title: "Professional and Reliable",
    text: "As a brand manager, I need tools I can trust. This platform has never let me down, and the customer support is excellent.",
    author: "Michael Chen",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    title: "Perfect for My Business",
    text: "Running weekly giveaways used to be a hassle. Now it's automated and takes just a few clicks. Highly recommend!",
    author: "Emma Davis",
    rating: 4,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ))}
  </div>
);

export const Reviews = () => (
  <section className="bg-white dark:bg-gray-800 transition-colors">
    <Container className="py-24">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white sm:text-4xl">
        Trusted by Creators Worldwide
      </h2>
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <StarRating rating={review.rating} />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {review.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{review.text}</p>
              <div className="mt-6 flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={review.image}
                  alt={review.author}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {review.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);