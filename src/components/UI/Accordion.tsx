import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <div className="space-y-4 max-w-[850px] mx-auto w-full">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id}
            className="bg-white rounded-[12px] border border-[#83ACA2] overflow-hidden transition-all duration-200"
          >
            {/* Header Trigger */}
            <div
              role="button"
              id={`accordion-header-${item.id}`}
              aria-controls={`accordion-panel-${item.id}`}
              aria-expanded={isOpen}
              tabIndex={0}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50 select-none"
            >
              <h3 className="text-[15px] sm:text-base font-bold text-brand-dark pr-4">
                {item.question}
              </h3>
              <span className="text-brand-dark shrink-0">
                {isOpen ? (
                  <Minus size={20} className="stroke-[1.5]" />
                ) : (
                  <Plus size={20} className="stroke-[1.5]" />
                )}
              </span>
            </div>

            {/* Content Panel */}
            <div
              id={`accordion-panel-${item.id}`}
              aria-labelledby={`accordion-header-${item.id}`}
              role="region"
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px]' : 'max-h-0 pointer-events-none'
              } overflow-hidden`}
            >
              <div className="px-6 pb-6 text-sm sm:text-[15px] leading-relaxed text-brand-grayText font-light">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
