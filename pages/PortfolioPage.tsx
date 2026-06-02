import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { TechStackChart } from '../components/TechStackChart';

export const PortfolioPage: React.FC = () => (
  <div className="pt-24 container mx-auto px-6 pb-20">
    <Portfolio />
    <TechStackChart />
  </div>
);
