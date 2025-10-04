"use client";

import type { PropsWithChildren } from "react";
import * as Sentry from "@sentry/react";

let isSentryInitialized = false;

function initializeSentry() {
  if (isSentryInitialized) {
    return;
  }

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Sentry DSN is not set. Define NEXT_PUBLIC_SENTRY_DSN to enable error tracking."
      );
    }
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  Sentry.init({
    dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  isSentryInitialized = true;
}

export function SentryErrorBoundary({ children }: PropsWithChildren) {
  initializeSentry();

  return (
    <Sentry.ErrorBoundary
      fallback={
        <div className="space-y-4 text-center">
          <h2 className="text-lg font-semibold text-slate-100">
            Something went wrong.
          </h2>
          <p className="text-sm text-slate-400">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
        </div>
      }
      showDialog={process.env.NODE_ENV === "production"}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

