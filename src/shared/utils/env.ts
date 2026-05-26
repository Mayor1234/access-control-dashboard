const required = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
} as const;

const missing = Object.entries(required)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variable(s): ${missing.join(', ')}.\n` +
      'Make sure your .env file exists and contains these keys.'
  );
}

export const env = required as Record<keyof typeof required, string>;
