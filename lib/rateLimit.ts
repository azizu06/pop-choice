const REQUEST_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

const requests = new Map<string, { count: number; resetAt: number }>();

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; resetAt: number };

export const checkRateLimit = (key: string): RateLimitResult => {
  const now = Date.now();
  const current = requests.get(key);

  if (!current || current.resetAt <= now) {
    requests.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return { allowed: true };
  }

  if (current.count >= REQUEST_LIMIT) {
    return {
      allowed: false,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;

  return { allowed: true };
};
