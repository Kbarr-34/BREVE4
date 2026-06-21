import { useState } from 'react';
import Icon from './Icon';

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
        <span className="text-sm font-medium text-forest-100 group-hover:text-white transition-colors pr-4">{q}</span>
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={16} className="text-lime-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="pb-4 text-sm text-forest-300 leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;