import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

/** Mirrors the turn shape the backend accepts. */
interface HistoryTurn {
    role: 'user' | 'model';
    parts: { text: string }[];
}

// ── Guardrail limits ─────────────────────────────────────────────
// These are UX guardrails only — they keep the widget feeling sane and
// cut obvious waste. They are NOT the security boundary: anyone can call
// /api/chat directly, so the authoritative validation, rate limiting and
// the Gemini key all live server-side in backend/.
const MAX_INPUT_LENGTH = 500;          // chars per message
const MAX_MESSAGES_PER_SESSION = 20;   // model calls per page load
const MIN_SEND_INTERVAL_MS = 1500;     // cooldown between sends
const MAX_HISTORY_TURNS = 12;          // memory window (≈6 exchanges)

const CHAT_ENDPOINT = '/api/chat';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Pranav's AI assistant. Ask me anything about his work, skills, or experience!",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Multi-turn memory sent to the model (excludes the greeting + any errors).
    // The resume that grounds the model is loaded server-side, so the client
    // no longer needs to fetch or send it.
    const historyRef = useRef<HistoryTurn[]>([]);
    const lastSendRef = useRef<number>(0);
    const sentCountRef = useRef<number>(0);

    const pushBotMessage = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: `${Date.now()}-bot`, text, sender: 'bot', timestamp: new Date() },
        ]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isMinimized]);

    const handleSendMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isLoading) return;

        // ── Guardrail: input length ──────────────────────────────
        if (trimmed.length > MAX_INPUT_LENGTH) {
            pushBotMessage(`Please keep your question under ${MAX_INPUT_LENGTH} characters.`);
            return;
        }

        // ── Guardrail: send cooldown ─────────────────────────────
        const now = Date.now();
        if (now - lastSendRef.current < MIN_SEND_INTERVAL_MS) return;

        // ── Guardrail: per-session cap ───────────────────────────
        if (sentCountRef.current >= MAX_MESSAGES_PER_SESSION) {
            setLimitReached(true);
            pushBotMessage(
                "That's the message limit for this session — thanks for chatting! Refresh the page to start over, or reach out via the contact section."
            );
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmed,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        lastSendRef.current = now;
        sentCountRef.current += 1;

        try {
            // The backend holds the Gemini key, the system instruction and the
            // resume; we send only the message and the recent memory window.
            const response = await fetch(CHAT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    history: historyRef.current.slice(-MAX_HISTORY_TURNS),
                }),
            });

            const data = (await response.json().catch(() => null)) as
                | { reply?: string; error?: string }
                | null;

            if (!response.ok) {
                if (response.status === 429) {
                    pushBotMessage("You're sending messages a bit fast — give it a moment and try again.");
                    return;
                }
                throw new Error(data?.error ?? `Request failed with ${response.status}`);
            }

            const text = data?.reply;

            if (!text) {
                throw new Error('Empty or blocked response.');
            }

            // Persist this exchange into memory only on success.
            historyRef.current.push(
                { role: 'user', parts: [{ text: trimmed }] },
                { role: 'model', parts: [{ text }] }
            );

            setMessages((prev) => [
                ...prev,
                { id: `${Date.now()}-bot`, text, sender: 'bot', timestamp: new Date() },
            ]);
        } catch (error) {
            // Log details for debugging, but never surface raw SDK / safety
            // errors (or config hints) to the visitor.
            console.error('Chatbot error:', error);
            pushBotMessage(
                "Sorry — I couldn't process that just now. Please try rephrasing, or reach out via the contact section."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
                aria-label="Open Chatbot"
            >
                <MessageCircle size={24} />
                <span className="whitespace-nowrap font-light">
                    Ask Pranav AI
                </span>
            </button>
        );
    }

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700 ${isMinimized ? 'w-72 h-14' : 'w-80 sm:w-96 h-[500px] max-h-[80vh]'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <h3 className="font-semibold">Ask Pranav AI</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                        aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                    >
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-gray-900 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    <span className="text-[10px] opacity-70 mt-1 block">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                maxLength={MAX_INPUT_LENGTH}
                                placeholder={limitReached ? 'Session limit reached — refresh to continue' : 'Type your question...'}
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || limitReached}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || limitReached || !inputValue.trim()}
                                className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chatbot;
