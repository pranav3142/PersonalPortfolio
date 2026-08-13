/**
 * Best-effort per-IP rate limiting.
 *
 * IMPORTANT: this is in-memory, and serverless instances don't share memory.
 * A caller spread across several warm instances gets a correspondingly higher
 * effective limit, and counters reset on cold start. It raises the cost of
 * casual abuse; it is not a hard guarantee. For a real ceiling, put a quota on
 * the Gemini key itself (or move this state to Redis/Upstash).
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the map can't grow without bound on a warm instance. */
function evictExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry. Only meaningful when !allowed. */
  retryAfter: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  evictExpired(now);

  const bucket = buckets.get(ip);

  if (!bucket) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}
