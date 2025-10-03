import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';

interface MobileBottomBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setView }) => {
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface/95 backdrop-blur">
      <div className="mx-auto w-full max-w-2xl px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-1">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-1">

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
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-sm'
                    : 'text-text-subtle hover:text-text hover:bg-surface-alt/80 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
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
