<<<<<<< HEAD
import { Match } from '@/types';
import * as htmlToImage from 'html-to-image';
import Handlebars from 'handlebars';

const templateSource = `
<div style="width: 1080px; height: 1080px; display: flex; flex-direction: column; background-color: #1a202c; color: white; font-family: sans-serif;">
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px; border-bottom: 2px solid #4a5568;">
        <img src="{{match.homeTeam.logo}}" style="width: 150px; height: 150px;"/>
        <div style="margin: 0 60px; text-align: center;">
            <p style="font-size: 80px; font-weight: bold; margin: 0;">{{match.homeTeam.score}} - {{match.awayTeam.score}}</p>
            <p style="font-size: 30px; color: #a0aec0; margin-top: 10px;">Full Time</p>
        </div>
        <img src="{{match.awayTeam.logo}}" style="width: 150px; height: 150px;"/>
    </div>
    <div style="padding: 40px; text-align: center;">
        <p style="font-size: 50px; font-weight: bold;">{{match.homeTeam.name}} vs {{match.awayTeam.name}}</p>
        <p style="font-size: 30px; color: #a0aec0; margin-top: 10px;">{{match.venue}}</p>
    </div>
    <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center;">
        <p style="font-size: 40px; text-align: center; margin: 0 40px;">I was there! One of the {{match.attendance}} to witness this clash.</p>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 40px; border-top: 2px solid #4a5568;">
        <img src="/logo.png" style="width: 80px; height: 80px;"/>
        <p style="font-size: 30px; font-weight: bold;">The Turnstile</p>
    </div>
</div>
`;

const template = Handlebars.compile(templateSource);

export const generateShareImage = async (match: Match): Promise<string> => {
    const dataUrl = await htmlToImage.toPng(document.createElement('div'), {
        width: 1080,
        height: 1080,
        style: { margin: '0' },
        pixelRatio: 1,
        fontEmbedCSS: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          src: url(https://rsms.me/inter/font-files/Inter-Bold.woff2) format('woff2');
        }
      `,
        template: { 
            html: template({ match }), 
            helpers: {},
            fonts: []
        }
    });
    return dataUrl;
};
=======
// utils/share.ts
export type ShareOutcome = 'shared' | 'copied' | 'dismissed' | 'error';

export const getAppShareUrl = (): string => {
  const envBase = import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined;
  if (envBase) return envBase;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

export async function attemptShare(args: {
  title: string;
  text: string;
  url: string;
}): Promise<ShareOutcome> {
  try {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      await (navigator as any).share(args);
      return 'shared';
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') return 'dismissed';
  }
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(args.url);
      return 'copied';
    }
  } catch {}
  return 'error';
}
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
