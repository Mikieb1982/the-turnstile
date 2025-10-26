import React from 'react';
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
  
  
