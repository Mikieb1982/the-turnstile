import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseStyles =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_10px_24px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d08]';

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-gradient-to-r from-[#1f5d32] via-[#2f7d45] to-[#d4af37] text-[#0a130c] hover:from-[#27673a] hover:via-[#388752] hover:to-[#f0d886]',
    secondary:
      'border border-[#2f4632] bg-[#142319]/90 text-[#f3f2e8] hover:border-[#d4af37]/70 hover:text-white',
    outline:
      'border border-[#d4af37]/70 bg-transparent text-[#d4af37] hover:bg-[#d4af37]/15 hover:text-[#f8f5e6]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.55)]'}`}
    >
      {children}
    </button>
  );
};
