import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { children, variant = 'primary', size = 'md', className = '', ...props },
  ref
) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 hover:shadow-indigo-600/50 focus-visible:ring-indigo-500',
    secondary:
      'bg-gray-700 text-white shadow-lg shadow-gray-700/50 hover:bg-gray-800 hover:shadow-gray-800/50 focus-visible:ring-gray-700',
    outline:
      'border border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 focus-visible:ring-indigo-500',
  };

  const classes = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${className}
  `;

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
