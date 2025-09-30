import type { FC, ReactNode } from 'react';

interface TileProps {
  title: string;
  eyebrow?: string;
  highlight?: boolean;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

const composeClasses = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

export const Tile: FC<TileProps> = ({
  title,
  eyebrow,
  highlight = false,
  children,
  className,
  'aria-label': ariaLabel,
}) => {
  const baseClasses = 'rounded-2xl border p-6 shadow-sm transition focus-within:ring-2 focus-within:ring-orange-500/70 focus:outline-none';
  const themeClasses = highlight
    ? 'border-orange-400/70 bg-orange-50/80 dark:border-orange-500/40 dark:bg-orange-500/10'
    : 'border-white/40 bg-white/80 dark:border-white/10 dark:bg-slate-900/70';

  return (
    <section
      aria-label={ariaLabel}
      className={composeClasses(baseClasses, themeClasses, className)}
      tabIndex={-1}
    >
      <header className="mb-4 space-y-1">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {eyebrow}
          </p>
        )}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      </header>
      <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  );
};
