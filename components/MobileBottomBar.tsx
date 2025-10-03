import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';
import { ArrowLeftIcon } from './Icons';

interface MobileBottomBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setView }) => {
  const labelRefs = React.useRef<Partial<Record<View, HTMLSpanElement | null>>>({});
  const [wrappedViews, setWrappedViews] = React.useState<Record<View, boolean>>({} as Record<View, boolean>);

  const measureWrapping = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextWrapped = mainNavigationItems.reduce((acc, { view }) => {
      const element = labelRefs.current[view];

      if (!element) {
        acc[view] = false;
        return acc;
      }

      const { lineHeight } = window.getComputedStyle(element);
      const parsedLineHeight = Number.parseFloat(lineHeight || '0');
      const threshold = Number.isFinite(parsedLineHeight) && parsedLineHeight > 0 ? parsedLineHeight * 1.1 : element.clientHeight;

      acc[view] = element.scrollHeight - 1 > threshold;

      return acc;
    }, {} as Record<View, boolean>);

    setWrappedViews((prev) => {
      const hasChanges = mainNavigationItems.some(({ view }) => prev[view] !== nextWrapped[view]);
      return hasChanges ? nextWrapped : prev;
    });
  }, []);

  React.useEffect(() => {
    measureWrapping();

    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      measureWrapping();
    });

    mainNavigationItems.forEach(({ view }) => {
      const element = labelRefs.current[view];
      if (element) {
        resizeObserver.observe(element);
      }
    });

    const handleWindowResize = () => {
      measureWrapping();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [measureWrapping]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setView('UPCOMING');
    }
  };

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface/95 backdrop-blur">
      <div className="mx-auto w-full max-w-2xl px-2.5 pt-1.5 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-full rounded-full border border-border/70 bg-surface-alt/70 px-2.5 py-1.5 text-[10px] font-semibold leading-tight text-text-subtle transition-colors hover:border-border hover:text-text"
            aria-label="Go back"
          >
            <span className="flex items-center justify-center gap-1">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Back</span>
            </span>
          </button>
          {mainNavigationItems.map(({ label, view, icon: Icon }) => {
            const isActive = currentView === view;
            const isWrapped = wrappedViews[view];
            const shouldShowLabel = isWrapped === undefined ? true : !isWrapped;
            return (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                className={`w-full rounded-full px-2.5 py-1.5 text-[10px] font-semibold leading-tight transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/40 shadow-sm'
                    : 'text-text-subtle hover:text-text hover:bg-surface-alt/80 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative flex flex-col items-center justify-center gap-1 text-center">
                  <span
                    ref={(element) => {
                      labelRefs.current[view] = element;
                    }}
                    className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-normal break-words text-[10px] leading-tight opacity-0"
                    aria-hidden
                  >
                    {label}
                  </span>
                  <Icon className={`h-4 w-4 ${isActive ? 'text-current' : 'text-text-subtle'}`} aria-hidden />
                  {shouldShowLabel ? (
                    <span className="whitespace-nowrap text-[10px] leading-tight">{label}</span>
                  ) : (
                    <span className="sr-only">{label}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
