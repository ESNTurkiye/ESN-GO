'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-esn-magenta/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-esn-magenta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-oswald font-bold text-esn-dark-blue mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 font-lato">
                We encountered an unexpected error. Please try again.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                <p className="text-sm font-mono text-red-800 break-words">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="magenta"
                onClick={reset}
                aria-label="Try again"
              >
                Try Again
              </Button>
              <Button
                variant="cyan"
                onClick={() => (window.location.href = '/')}
                aria-label="Go to homepage"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

