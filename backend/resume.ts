import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Loads the resume that grounds the chatbot.
 *
 * The canonical copy is the one the site serves for download
 * (frontend/public/Pranav_Resume.txt) — deliberately a single source of
 * truth, since a second copy would drift out of sync with it.
 *
 * vercel.json lists this path under `includeFiles` so it ships with the
 * function bundle. Read once per cold start and cached for the life of
 * the instance.
 */

const RESUME_PATH = path.join(process.cwd(), 'frontend', 'public', 'Pranav_Resume.txt');

let cached: string | null = null;

export async function loadResume(): Promise<string> {
  if (cached !== null) return cached;

  const text = await readFile(RESUME_PATH, 'utf-8');
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error(`Resume at ${RESUME_PATH} is empty`);
  }

  cached = trimmed;
  return cached;
}
