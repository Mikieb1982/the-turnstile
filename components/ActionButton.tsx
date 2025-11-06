// components/ActionButton.tsx
interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ActionButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false
}: ActionButtonProps) {
  const baseClasses = `
    font-bold uppercase tracking-wide rounded-lg
    transition-all duration-200
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
  `;

  const variantClasses = {
    primary: `
      bg-crimson text-cream shadow-crimson-glow
      hover:scale-105 hover:shadow-xl
      active:scale-95
    `,
    secondary: `
      bg-navy text-cream
      hover:scale-105 hover:shadow-card-hover
      active:scale-95
    `,
    accent: `
      bg-gold text-navy
      hover:scale-105 hover:shadow-glow
      active:scale-95
    `,
    ghost: `
      bg-transparent text-text-primary border-2 border-text-primary
      hover:bg-text-primary hover:text-background
      active:scale-95
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {icon && (
        <span className="material-symbols-outlined">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
