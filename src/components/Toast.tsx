import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-space-md py-2.5 rounded-xl shadow-xl font-label-sm text-label-sm flex items-center gap-space-xs pointer-events-none z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-inverse-surface/80 max-w-[90vw]">
      <span
        className={`material-symbols-outlined text-[18px] ${
          type === 'warning' ? 'text-tertiary-fixed' : 'text-primary-fixed'
        }`}
      >
        {type === 'warning' ? 'info' : 'check_circle'}
      </span>
      <span className="font-medium text-xs sm:text-sm">{message}</span>
    </div>
  );
};
