import React from 'react';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';

export const AboutPage: React.FC = () => (
  <div className="pt-24">
    <About />
    <Testimonials />
  </div>
);
