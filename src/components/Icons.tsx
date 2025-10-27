import React from 'react';
<<<<<<< HEAD
import Image from 'next/image';

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// A generic Icon wrapper
const Icon: React.FC<React.PropsWithChildren<SVGProps>> = ({ children, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const TeamLogo: React.FC<{ logo: string; alt: string; size?: number }> = ({ logo, alt, size = 32 }) => (
  <Image src={logo} alt={alt} width={size} height={size} className="object-contain" />
);

export const ArrowLeftIcon: React.FC<SVGProps> = (props) => (
  <Icon {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Icon>
);

export const ShareIcon: React.FC<SVGProps> = (props) => (
  <Icon {...props}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v12" />
  </Icon>
);


export const TrophyIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M12 2L9 5h6l-3-3zM9 5H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-8h3a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3L12 2z" />
    </Icon>
  );
  
  export const CheckCircleIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </Icon>
  );
  
  export const LocationMarkerIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </Icon>
  );
  
  export const MapIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2"/>
      <line x1="8" y1="18" x2="8" y2="2"/>
      <line x1="16" y1="22" x2="16" y2="6"/>
    </Icon>
  );
  
  export const SparklesIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
    </Icon>
  );
  
  export const StarIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </Icon>
  );
  
  export const ShieldCheckIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </Icon>
  );
  
  export const Squares2X2Icon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 12h18M12 3v18" />
    </Icon>
  );

  export const AtSymbolIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </Icon>
  );
  
  export const CodeBracketIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
      <path d="M10 20.5 3.5 14 10 7.5" />
      <path d="M14 20.5 20.5 14 14 7.5" />
    </Icon>
  );

  export const LifebuoyIcon: React.FC<SVGProps> = (props) => (
    <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
    </Icon>
  );
  
  
=======

type IconProps = React.SVGProps<SVGSVGElement>;

type ThemeMode = 'light' | 'dark';

const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
const logoDarkSrc = `${import.meta.env.BASE_URL}logodark.png`;

interface LogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  theme?: ThemeMode;
}

export const RugbyBallIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.01,2.02c-5.5,0-9.99,3.58-9.99,8c0,4.42,4.49,8,9.99,8c5.5,0,9.99-3.58,9.99-8C22,5.6,17.51,2.02,12.01,2.02z M10.43,14.6l-3.32-1.92l1.66-2.88l3.32,1.92L10.43,14.6z M11.99,11.02l-3.32-1.92l1.66-2.88l3.32,1.92L11.99,11.02z M15.25,12.68l-3.32-1.92l1.66-2.88l3.32,1.92L15.25,12.68z"/>
    </svg>
);

export const LogoIcon: React.FC<LogoIconProps> = ({ className, theme = 'light', alt, style, ...props }) => {
  const resolvedSrc = theme === 'dark' ? logoDarkSrc : logoSrc;

  return (
    <img
      src={resolvedSrc}
      alt={alt ?? 'The Turnstile logo'}
      className={className}
      loading="lazy"
      style={{
        objectFit: 'contain',
        objectPosition: 'center',
        ...style,
      }}
      {...props}
    />
  );
};

export const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75z" />
    </svg>
);

export const CalendarDaysIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M10.5 12h3m-3 3.75h.008v.008h-.008v-.008zm0 0h.008v.008h-.008v-.008zm-2.25.008h.008v.008H8.25v-.008zm5.25 0h.008v.008h-.008v-.008zm-2.25 0h.008v.008h-.008v-.008zm5.25 0h.008v.008h-.008v-.008zm-4.5-3.75h.008v.008h-.008v-.008zm2.25 0h.008v.008h-.008v-.008z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlusCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09c-1.18 0-2.09.954-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const InformationCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 00-9 0m9 0h.008v.008h-.008v-.008zm-9 0h-.008v.008h.008v-.008z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75l.413-.413a1.5 1.5 0 012.122 0l.413.413m-2.948 0h2.948M9 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v3.75m-6 0V3.75m6 0V7.5m-6 0h6m-3-3.75h.008v.008H12V3.75z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const TableCellsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h17.25m-17.25 0V4.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v13.875m-17.25 0h17.25M3.375 9h17.25M9 3.375v17.25m6-17.25v17.25" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.591 1.591M5.25 12H3m4.243-4.95l-1.591-1.591M12 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const BuildingStadiumIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-18 0v8.25a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 17.25V9" />
    </svg>
);

export const LocationMarkerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.5-4.8 7.5-8.1 7.5-11.25A7.5 7.5 0 0012 2.25a7.5 7.5 0 00-7.5 7.5C4.5 12.9 7.5 16.2 12 21z" />
        <circle cx="12" cy="9.75" r="2.25" />
    </svg>
);

export const NextSevenDaysIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M8.25 7.5v2" />
    <path strokeLinecap="round" d="M15.75 7.5v2" />
    <rect x="7" y="9" width="10" height="7.5" rx="1.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11h3l-1.75 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.25 11.75l1.75 1.75-1.75 1.75" />
    <path strokeLinecap="round" d="M17.5 13.5h-2.5" />
  </svg>
);

export const NearbyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5c3.3-3.51 5.5-6.21 5.5-8.75a5.5 5.5 0 10-11 0c0 2.54 2.2 5.24 5.5 8.75z" />
    <circle cx="12" cy="9.75" r="1.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 20.25h5" />
  </svg>
);

export const FixturesResultsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <rect x="6.75" y="8" width="10.5" height="8" rx="1.5" />
    <path strokeLinecap="round" d="M12 8v8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h2M13 13.5h2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l1.25-1.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5l-1.25 1.25" />
    <circle cx="12" cy="12" r="1.35" />
  </svg>
);

export const LeagueTableChartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M7.25 15.5v-3.75M10.5 15.5v-6M13.75 15.5V9M17 15.5V11" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 17.5h12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.25 11.75l2.5-2.5 2.25 2.25 3-3 2.75 2.25" />
  </svg>
);

export const GroundsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <rect x="6.75" y="7.75" width="10.5" height="8.5" rx="1.75" />
    <path strokeLinecap="round" d="M6.75 12h10.5" />
    <circle cx="12" cy="12" r="1.75" />
    <path strokeLinecap="round" d="M9 7.75v8.5M15 7.75v8.5" />
  </svg>
);

export const CommunityIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5c-2.35 0-4.25 1.14-4.25 2.5v.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5c2.35 0 4.25 1.14 4.25 2.5v.5" />
    <circle cx="12" cy="11" r="2.5" />
    <circle cx="7.75" cy="10" r="1.75" />
    <circle cx="16.25" cy="10" r="1.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.75 17.5v-1.25c0-1.1.75-2.1 1.85-2.45" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.25 17.5v-1.25c0-1.1-.75-2.1-1.85-2.45" />
  </svg>
);

export const CommunityHeartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16.75c0-1.38 1.3-2.75 2.9-2.75.92 0 1.66.47 2.1 1.07.44-.6 1.18-1.07 2.1-1.07 1.6 0 2.9 1.37 2.9 2.75 0 2.23-2.34 3.65-5 5.25-2.66-1.6-5-3.02-5-5.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.25 11.75l1.25-2.25M16.75 11.75l-1.25-2.25" />
    <circle cx="9" cy="9" r="1.5" />
    <circle cx="15" cy="9" r="1.5" />
  </svg>
);

export const AboutIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5c-1.24 0-2.25.86-2.25 1.92 0 .7.41 1.28 1.05 1.61l.6.31c.58.3.9.76.9 1.31 0 .83-.67 1.5-1.5 1.5" />
    <path strokeLinecap="round" d="M12 16.5h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 18.5h5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a3.5 3.5 0 10-5.74-3.85" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.75l.75-1.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 5.75L8.75 4" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75c-3.728 0-6.75 1.77-6.75 3.25V21c0-2.485 3.022-4.5 6.75-4.5s6.75 2.015 6.75 4.5v1c0-1.48-3.022-3.25-6.75-3.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5a3 3 0 01.45-1.59 4.124 4.124 0 00.45 6.84" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10.5a3 3 0 00-.45-1.59 4.124 4.124 0 01-.45 6.84" />
    </svg>
);

export const ArrowRightOnRectangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 7.5l4.5 4.5-4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25h6A2.25 2.25 0 0012.75 18V6A2.25 2.25 0 0010.5 3.75h-6" />
    </svg>
);

export const ArrowLeftOnRectangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5L6 12l4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 20.25h-6A2.25 2.25 0 0111.25 18V6A2.25 2.25 0 0113.5 3.75h6" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75L4.5 12l5.25 5.25" />
    </svg>
);

export const ArrowUpTrayIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25L12 4.5l3.75 3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75v1.5A2.25 2.25 0 006.75 19.5h10.5a2.25 2.25 0 002.25-2.25v-1.5" />
    </svg>
);

export const CalendarPlusIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25" />
        <rect x="3" y="6.75" width="18" height="13.5" rx="2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 13.5h4.5M12 11.25v4.5" />
    </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5h2.318a1.5 1.5 0 001.342-.83l.68-1.36A1.5 1.5 0 0110.24 4.5h3.52a1.5 1.5 0 011.4.81l.68 1.36a1.5 1.5 0 001.34.83H19.5A1.5 1.5 0 0121 9v8.25A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V9A1.5 1.5 0 014.5 7.5z" />
        <circle cx="12" cy="12.75" r="3" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="12" cy="12" r="8.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v4.5l2.25 2.25" />
    </svg>
);

export const ListBulletIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="5.25" cy="6.75" r="1.5" />
        <circle cx="5.25" cy="12" r="1.5" />
        <circle cx="5.25" cy="17.25" r="1.5" />
        <path strokeLinecap="round" d="M9 6.75h10.5M9 12h10.5M9 17.25h10.5" />
    </svg>
);

export const MiniSpinnerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
        <circle cx="12" cy="12" r="8" strokeOpacity={0.25} />
        <path strokeLinecap="round" d="M20 12a8 8 0 00-8-8" />
    </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l8.954 5.373a1.5 1.5 0 001.592 0L21.75 6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5z" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a1.5 1.5 0 012.121 0l1.53 1.53a1.5 1.5 0 010 2.121l-9.19 9.19-3.712.742.742-3.712z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 20.25h13.5" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5v5h5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.318 15.682a7.5 7.5 0 0111.036-10.364L18.75 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.682 8.318A7.5 7.5 0 017.646 18.682L5.25 16.5" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="10.5" cy="10.5" r="5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l4 4" />
    </svg>
);

export const ServerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <rect x="3.75" y="4.5" width="16.5" height="6" rx="1.5" />
        <rect x="3.75" y="13.5" width="16.5" height="6" rx="1.5" />
        <circle cx="7.5" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="7.5" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
);

export const ShareIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="7.5" cy="12" r="1.5" />
        <circle cx="16.5" cy="6.75" r="1.5" />
        <circle cx="16.5" cy="17.25" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.85 11.25l6.3-3.15M8.85 12.75l6.3 3.15" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l7.5 2.25v6.75c0 5.25-4.5 8.625-7.5 9.75-3-1.125-7.5-4.5-7.5-9.75V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75l1.5 1.5 3-3" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l1.5 4.5L17 9l-4.5 1.5L11 15l-1.5-4.5L5 9l4.5-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l.75 2.25L22 8l-2.25.75L19 11l-.75-2.25L16 8l2.25-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z" />
    </svg>
);

export const MapIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75L3 4.5v14.25l6.75 2.25 6.75-2.25L21 19.5V5.25l-4.5-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75v14.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5v14.25" />
    </svg>
);

export const Squares2X2Icon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="12" y="4.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="4.5" y="12" width="7.5" height="7.5" rx="1.5" />
        <rect x="12" y="12" width="7.5" height="7.5" rx="1.5" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none" {...props}>
        <path d="M12 3.75l2.286 4.632 5.114.744-3.7 3.61.874 5.095L12 15.75l-4.574 2.381.874-5.095-3.7-3.61 5.114-.744z" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
    </svg>
);

export const LockClosedIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const LockOpenIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5V6.75a1.5 1.5 0 113 0v3.75" />
    </svg>
);
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
