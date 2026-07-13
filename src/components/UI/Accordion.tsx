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
    <div className="space-y-4 max-w-4xl mx-auto w-full">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-teal-50 overflow-hidden transition-all duration-200"
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
              className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-brand-primary select-none"
            >
              <h3 className="text-sm sm:text-base font-bold text-brand-dark pr-4">
                {item.question}
              </h3>
              <span className="text-brand-primary shrink-0">
                {isOpen ? (
                  <Minus size={18} className="stroke-[3]" />
                ) : (
                  <Plus size={18} className="stroke-[3]" />
                )}
              </span>
            </div>

            {/* Content Panel */}
            <div
              id={`accordion-panel-${item.id}`}
              aria-labelledby={`accordion-header-${item.id}`}
              role="region"
              className={`transition-all duration-350 ease-in-out ${
                isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0 pointer-events-none'
              } overflow-hidden`}
            >
              <div className="p-6 text-sm leading-relaxed text-teal-900 opacity-90">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
