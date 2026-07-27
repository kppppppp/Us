import React from 'react';
import { useParams } from 'react-router-dom';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-32 pb-16 px-6 text-center max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-bold mb-4 capitalize">Service: {id?.replace('-', ' ')}</h1>
      <p className="text-neutral-500">Detailed breakdown of our core capability in this area.</p>
    </div>
  );
};
export default ServiceDetail;
