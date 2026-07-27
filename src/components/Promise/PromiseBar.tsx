import React from 'react';
import { PromiseItem } from './PromiseItem';
import { PROMISE_DATA } from '../../constants/promise';

export const PromiseBar: React.FC = () => {
  return (
    <div 
      data-reveal="promise"
      className="w-full max-w-[1500px] bg-white border border-[rgba(0,0,0,0.06)] rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 shadow-brand-sm select-none"
    >
      {/* Column 1: Header */}
      <div className="flex items-center gap-3 shrink-0 pr-6">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-brand-purple">
          Our Promise
        </span>
      </div>

      {/* Dividers & Items */}
      {PROMISE_DATA.map((promise) => (
        <React.Fragment key={promise.id}>
          {/* Vertical line divider */}
          <div className="hidden md:block w-[1px] h-12 bg-[rgba(0,0,0,0.06)]" />
          
          <div className="flex-1">
            <PromiseItem
              num={promise.num}
              title={promise.title}
              description={promise.description}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
export default PromiseBar;
