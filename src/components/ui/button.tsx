import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'glow' | 'destructive' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]';

    const variants = {
      default: 'bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 rounded-xl',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/80 rounded-xl',
      outline: 'border border-slate-300 dark:border-slate-700/80 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl',
      ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-xl',
      glow: 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:brightness-110 rounded-xl',
      neon: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.35)] hover:bg-cyan-900/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] rounded-xl',
      destructive: 'bg-red-600 text-white hover:bg-red-500 rounded-xl shadow-md shadow-red-600/20',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
