import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40',
        accent: 'bg-accent text-accent-foreground hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-white/5 text-foreground',
        destructive: 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
