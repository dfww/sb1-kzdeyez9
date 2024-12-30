import type { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Tips for Running Successful Social Media Giveaways',
    slug: 'tips-for-successful-giveaways',
    excerpt: 'Learn the best practices for engaging your audience and running fair contests that drive real growth.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-15',
    readTime: 5,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  {
    id: 2,
    title: 'How to Grow Your Following with Strategic Giveaways',
    slug: 'grow-following-with-giveaways',
    excerpt: 'Discover proven strategies to increase your social media presence through well-planned contests.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-10',
    readTime: 7,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  {
    id: 3,
    title: 'The Psychology Behind Successful Social Media Contests',
    slug: 'psychology-of-social-contests',
    excerpt: 'Understanding user behavior and motivation to create more engaging giveaways.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-05',
    readTime: 6,
    author: {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
];