import React from 'react';
import { Services } from '../components/Services';
import { Process } from '../components/Process';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24">
      <Services />
      <Process />
    </div>
  );
};
