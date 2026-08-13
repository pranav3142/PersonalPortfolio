import type { VercelRequest, VercelResponse } from '@vercel/node';

import { handleChat } from '../backend/chat.js';

/**
 * Vercel entry point for POST /api/chat.
 *
 * Vercel only picks up serverless functions from an `api/` directory at the
 * deployment root — the directory name isn't configurable — so this file is a
 * platform adapter and nothing more. All real logic lives in backend/, which
 * keeps it host-agnostic and unit-testable.
 */

function clientIpOf(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    // May be a comma-separated chain; the first entry is the origin client.
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = (typeof req.body === 'object' && req.body !== null ? req.body : {}) as {
    message?: unknown;
    history?: unknown;
  };

  const { status, body: payload } = await handleChat(
    { message: body.message, history: body.history },
    clientIpOf(req)
  );

  if (status === 429 && 'retryAfter' in payload && payload.retryAfter) {
    res.setHeader('Retry-After', String(payload.retryAfter));
  }

  return res.status(status).json(payload);
}
