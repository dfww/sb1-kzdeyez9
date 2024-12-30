import React from 'react';
import { Layout } from '../components/common/Layout';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Reviews } from '../components/landing/Reviews';
import { BlogSection } from '../components/landing/BlogSection';
import { PricingTable } from '../components/landing/PricingTable';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => (
  <Layout>
    <Header />
    <Hero />
    <Reviews />
    <PricingTable />
    <BlogSection />
    <Footer />
  </Layout>
);