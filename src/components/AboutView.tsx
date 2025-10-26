import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AtSymbolIcon, CodeBracketIcon, LifebuoyIcon } from './Icons';
import { Page } from '../types';

interface AboutViewProps {
  onNavigate: (page: Page) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const [isCopied, setIsCopied] = useState(false);
  const email = 'hello@theturnstile.app';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const faqs = [
    {
      q: 'What is The Turnstile?',
      a: 'The Turnstile is a digital passport for rugby league fans. It allows you to track every match you attend, collect badges for your achievements, and see how you stack up against other fans.',
    },
    {
      q: 'How do I add a match?',
      a: 'Simply go to the \'My Matches\' tab and click the \'Add Match\' button. You can then search for the match you attended and add it to your passport.',
    },
    {
      q: 'What are badges?',
      a: 'Badges are a fun way to celebrate your support. You can earn badges for attending a certain number of matches, visiting different stadiums, and more.',
    },
    {
      q: 'Can I use The Turnstile offline?',
      a: 'Yes! The Turnstile is a Progressive Web App (PWA), which means you can use it even when you don\'t have an internet connection. Any changes you make while offline will be synced the next time you connect.',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-lg font-bold">About The Turnstile</h2>
        <p className="text-muted-foreground">
          Your digital rugby league passport. Never forget a match.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Have a question or a feature request? Get in touch.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCopyEmail} variant="outline">
              <AtSymbolIcon className="mr-2 h-4 w-4" />
              {isCopied ? 'Email Copied!' : email}
            </Button>
            <a
              href="https://github.com/the-turnstile-app/the-turnstile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <CodeBracketIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <Button variant="outline" onClick={() => onNavigate('report-issue')}>
              <LifebuoyIcon className="mr-2 h-4 w-4" />
              Report an Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it&apos;s made</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>
            The Turnstile is built by fans, for fans. It&apos;s a modern web app (PWA) built with
            the following technologies:
          </p>
          <ul className="list-disc list-inside">
            <li>React & TypeScript</li>
            <li>Vite for speedy development</li>
            <li>Tailwind CSS for styling</li>
            <li>Firebase for backend services (Authentication, Firestore)</li>
            <li>Hosted on Google Cloud</li>
          </ul>
          <p className="pt-2">
            The project is open source. We encourage you to check out the code,
            contribute if you can, or raise issues for bugs or feature requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
