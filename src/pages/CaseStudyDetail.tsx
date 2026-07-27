import React from 'react';
import { useParams } from 'react-router-dom';

export const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-32 pb-16 px-6 text-center max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-bold mb-4 capitalize">Case Study: {id?.replace('-', ' ')}</h1>
      <p className="text-neutral-500">Project details, business challenges, and technological architectures deployed.</p>
    </div>
  );
};
export default CaseStudyDetail;
