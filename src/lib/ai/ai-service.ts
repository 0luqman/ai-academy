import { GoogleGenerativeAI, Content } from "@google/generative-ai";

export interface AIResponse {
    content: string;
    usageContext: {
        model: string;
    };
}

export interface AIRequestConfig {
    model?: string;
    systemPrompt?: string;
}

// Using Gemma 27b as requested (defaulting to the IT version for chat)
const DEFAULT_MODEL = 'gemma-2-27b-it';

export class AIService {
    private genAI: GoogleGenerativeAI | null = null;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
        }
    }

    public async generateResponse(
        prompt: string,
        context: string,
        history: { role: 'user' | 'model', text: string }[] = [],
        config: AIRequestConfig = {}
    ): Promise<AIResponse> {
        if (!this.genAI) {
            // Log for developer but return graceful error to student
            console.error("AI Service: GEMINI_API_KEY is not configured.");
            return {
                content: "I'm sorry, I'm currently disconnected from my knowledge base. Please ask your teacher to check the API configuration.",
                usageContext: { model: 'offline' }
            };
        }

        try {
            const targetModel = config.model || DEFAULT_MODEL;
            const model = this.genAI.getGenerativeModel({ 
                model: targetModel,
                systemInstruction: config.systemPrompt || "You are an AI Academy by RiWoT tutor. Help the student understand the lesson material. Be concise and encouraging. Always refer to yourself as the RiWoT AI Tutor."
            });

            // Map history but filter out empty or invalid entries
            const chatHistory: Content[] = history
                .filter(h => h.text && h.text.trim().length > 0)
                .map(h => ({
                    role: h.role,
                    parts: [{ text: h.text }]
                }));

            const chat = model.startChat({
                history: chatHistory,
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                },
            });

            const fullPrompt = `Current Lesson Context:\n${context}\n\nStudent Question: ${prompt}`;
            const result = await chat.sendMessage(fullPrompt);
            const response = await result.response;
            const text = response.text();

            return {
                content: text,
                usageContext: {
                    model: targetModel,
                }
            };
        } catch (error: any) {
            console.error("AI Service Error:", error);
            // Fallback to a smaller model if the 27b one fails or is unavailable
            if (config.model !== 'gemma-2-9b-it' && !config.model) {
                console.log("Attempting fallback to Gemma 9b...");
                return this.generateResponse(prompt, context, history, { ...config, model: 'gemma-2-9b-it' });
            }

            return {
                content: "I'm having a bit of a 'brain fog' moment. Could you try rephrasing your question or checking back in a minute?",
                usageContext: {
                    model: DEFAULT_MODEL,
                }
            };
        }
    }
}

export const aiService = new AIService();
