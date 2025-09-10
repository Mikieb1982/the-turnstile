import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { SparklesIcon, PaperAirplaneIcon, LogoIcon, MiniSpinnerIcon } from './Icons';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const systemInstruction = "You are Scrum Sage, an expert on all things rugby league. You are friendly, knowledgeable, and provide concise and accurate answers. You love the sport and are eager to help fans learn more about teams, players, rules, and history. Keep your answers relatively short and conversational.";

export const AIChatView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hi! I am Scrum Sage. Ask me anything about rugby league!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                }
            });
        } catch (e) {
            console.error("Failed to initialize AI Chat:", e);
            setError("Could not initialize the AI chat service. Please check your connection or API configuration.");
        }
    }, []);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.text = modelResponse;
                    }
                    return newMessages;
                });
            }
        } catch (err) {
            console.error(err);
            const errorMessage = "Sorry, I couldn't process that request. Please try again.";
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                 if (lastMessage.role === 'model' && lastMessage.text === '') {
                    // If we created a blank message, update it with the error.
                    lastMessage.text = errorMessage;
                    return newMessages;
                }
                // Otherwise, add a new error message.
                return [...prev, { role: 'model', text: errorMessage }];
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col max-w-3xl mx-auto bg-surface rounded-xl shadow-card overflow-hidden">
            <header className="flex items-center gap-3 p-4 border-b border-border flex-shrink-0">
                <SparklesIcon className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-xl font-bold text-text-strong">Scrum Sage AI</h1>
                    <p className="text-sm text-text-subtle">Your AI-powered rugby league assistant</p>
                </div>
            </header>

            <div ref={chatHistoryRef} className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[60vh] min-h-[40vh]">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && (
                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <LogoIcon className="w-5 h-5 text-primary" />
                            </div>
                        )}
                        <div className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${
                            msg.role === 'user' 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-surface-alt text-text rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length-1]?.role !== 'model' && (
                     <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <LogoIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="max-w-md p-3 rounded-xl bg-surface-alt text-text rounded-bl-none flex items-center">
                            <MiniSpinnerIcon className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                )}
                {error && !isLoading && (
                    <div className="text-center text-danger text-sm">{error}</div>
                )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-surface-alt flex-shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about a player, team, or rule..."
                        className="flex-1 bg-surface text-text placeholder-text-subtle border border-border rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-primary text-white rounded-lg transition-colors hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
            </form>
        </div>
    );
};