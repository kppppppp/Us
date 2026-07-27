import React from 'react';

interface PromiseItemProps {
  num: string;
  title: string;
  description: string;
}

export const PromiseItem: React.FC<PromiseItemProps> = ({ num, title, description }) => {
  return (
    <div className="flex flex-col gap-2 pl-6 md:pl-8 select-none">
      <span className="text-[11px] font-bold text-brand-purple tracking-widest">{num}</span>
      <div className="flex flex-col text-sm text-brand-text font-medium leading-relaxed">
        <span>{title},</span>
        <span className="text-neutral-500">{description}</span>
      </div>
    </div>
  );
};
export default PromiseItem;
