import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  type Content,
} from '@google/generative-ai';

import { buildSystemInstruction } from './prompt.js';
import { loadResume } from './resume.js';
import { checkRateLimit } from './rateLimit.js';

/**
 * Gemini proxy — the whole reason this backend exists.
 *
 * The API key is read from a server-side env var and never leaves the server.
 * Previously the browser held the key and called Gemini directly, which meant
 * anyone could read it out of the shipped bundle.
 *
 * Deliberately framework-free: it takes a plain request shape and returns a
 * plain response shape, so the Vercel entry point in api/ is a thin adapter
 * and this logic stays portable to any host.
 */

const MAX_INPUT_LENGTH = 500;
const MAX_HISTORY_TURNS = 12;
const MODEL = 'gemini-2.5-flash';

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export interface ChatRequest {
  message: unknown;
  history: unknown;
}

export interface ChatResponse {
  status: number;
  body: { reply: string } | { error: string; retryAfter?: number };
}

/** Accept only the shape we send ourselves — anything else is rejected outright. */
function parseHistory(raw: unknown): Content[] | null {
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw)) return null;

  const parsed: Content[] = [];

  for (const turn of raw) {
    if (typeof turn !== 'object' || turn === null) return null;

    const { role, parts } = turn as { role?: unknown; parts?: unknown };
    if (role !== 'user' && role !== 'model') return null;
    if (!Array.isArray(parts)) return null;

    const texts: { text: string }[] = [];
    for (const part of parts) {
      if (typeof part !== 'object' || part === null) return null;
      const { text } = part as { text?: unknown };
      if (typeof text !== 'string') return null;
      texts.push({ text });
    }

    parsed.push({ role, parts: texts });
  }

  // Only the recent window is worth sending, and it caps how much text a
  // caller can push into the model on our budget.
  return parsed.slice(-MAX_HISTORY_TURNS);
}

export async function handleChat(req: ChatRequest, clientIp: string): Promise<ChatResponse> {
  const { message, history } = req;

  if (typeof message !== 'string') {
    return { status: 400, body: { error: 'Field "message" must be a string.' } };
  }

  const trimmed = message.trim();

  if (!trimmed) {
    return { status: 400, body: { error: 'Message cannot be empty.' } };
  }

  if (trimmed.length > MAX_INPUT_LENGTH) {
    return { status: 400, body: { error: `Message must be under ${MAX_INPUT_LENGTH} characters.` } };
  }

  const parsedHistory = parseHistory(history);
  if (parsedHistory === null) {
    return { status: 400, body: { error: 'Field "history" is malformed.' } };
  }

  const limit = checkRateLimit(clientIp);
  if (!limit.allowed) {
    return {
      status: 429,
      body: { error: 'Too many messages — give it a moment.', retryAfter: limit.retryAfter },
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Log for the operator; don't leak configuration detail to the caller.
    console.error('GEMINI_API_KEY is not set');
    return { status: 503, body: { error: 'Chat is unavailable right now.' } };
  }

  let resume: string;
  try {
    resume = await loadResume();
  } catch (error) {
    console.error('Failed to load resume:', error);
    return { status: 503, body: { error: 'Chat is unavailable right now.' } };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: buildSystemInstruction(resume),
      safetySettings: SAFETY_SETTINGS,
      generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
    });

    const chat = model.startChat({ history: parsedHistory });
    const result = await chat.sendMessage(trimmed);
    const reply = result.response.text();

    if (!reply) {
      return { status: 502, body: { error: 'Empty or blocked response.' } };
    }

    return { status: 200, body: { reply } };
  } catch (error) {
    // Upstream errors can carry key material or prompt text — log server-side,
    // return something generic.
    console.error('Gemini request failed:', error);
    return { status: 502, body: { error: 'Could not reach the model. Please try again.' } };
  }
}
