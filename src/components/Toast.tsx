import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastNotification {
  id: string;
  type: 'rfq' | 'meeting';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toast: ToastNotification | null;
  onClose: () => void;
  onViewAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose, onViewAction }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 flex items-start gap-3.5"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${toast.type === 'rfq' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-slate-950'}`}>
            {toast.type === 'rfq' ? <ShoppingBag className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{toast.type === 'rfq' ? 'RFQ List Updated' : 'Meeting Booked Successfully'}</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5 truncate">{toast.title}</h4>
            {toast.subtitle && (
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.subtitle}</p>
            )}

            {onViewAction && (
              <button
                onClick={onViewAction}
                className="mt-2 text-xs font-bold text-indigo-300 hover:text-indigo-200 underline cursor-pointer"
              >
                {toast.type === 'rfq' ? 'View RFQ Request List →' : 'View Meeting Details →'}
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
