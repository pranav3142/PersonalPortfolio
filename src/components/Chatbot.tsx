import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

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
    const [resumeContent, setResumeContent] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load resume content on mount
    useEffect(() => {
        const loadResume = async () => {
            try {
                const response = await fetch('/Pranav_Resume.txt');
                if (response.ok) {
                    const text = await response.text();
                    setResumeContent(text);
                } else {
                    console.error('Failed to load resume content');
                }
            } catch (error) {
                console.error('Error loading resume:', error);
            }
        };
        loadResume();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isMinimized]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
            }

            if (!resumeContent) {
                throw new Error('Resume content not loaded yet. Please try again in a moment.');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
        You are a helpful assistant for Pranav's portfolio website. 
        Answer the user's question using ONLY the context provided below from his resume.
        If the information is not in the resume, politely say you don't have that information.
        Keep your answers concise, professional, and friendly.

        RESUME CONTEXT:
        ${resumeContent}

        USER QUESTION:
        ${userMessage.text}
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: text,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: error instanceof Error ? error.message : "Sorry, I encountered an error. Please check your configuration.",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
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
                className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
                aria-label="Open Chatbot"
            >
                <MessageCircle size={24} />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
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
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <h3 className="font-semibold">Ask Pranav AI</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 hover:bg-blue-700 rounded transition-colors"
                        aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                    >
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-blue-700 rounded transition-colors"
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
                                        ? 'bg-blue-600 text-white rounded-br-none'
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
                                placeholder="Type your question..."
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
