import React from 'react';
import { LogoIcon, MenuIcon, XMarkIcon } from './Icons';
import type { View } from '../types';
import styles from './Header.module.css';

interface HeaderProps {
  setView: (view: View) => void;
  theme: string;
  isMobileNavOpen: boolean;
  onMobileNavToggle: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { setView, theme, isMobileNavOpen, onMobileNavToggle } = props;
  const themeMode = theme === 'dark' ? 'dark' : 'light';

  return (
    <>
      <button
        type="button"
        className={`md:hidden ${styles.logoButton}`}
        onClick={() => setView('PROFILE')}
        aria-label="Go to profile"
      >
        <LogoIcon className={styles.logoIcon} theme={themeMode} />
      </button>
      <button
        type="button"
        className={`md:hidden ${styles.menuButton}`}
        onClick={onMobileNavToggle}
        aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileNavOpen}
      >
        {isMobileNavOpen ? (
          <XMarkIcon className={styles.menuIcon} />
        ) : (
          <MenuIcon className={styles.menuIcon} />
        )}
      </button>
    </>
  );
};
