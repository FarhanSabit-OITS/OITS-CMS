import React from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

export const WorkflowPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ProcessTimeline />
    </div>
  );
};
