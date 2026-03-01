import { GoogleGenerativeAI } from "@google/generative-ai";

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

const DEFAULT_MODEL = 'gemini-1.5-flash';

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
        config: AIRequestConfig = {}
    ): Promise<AIResponse> {
        if (!this.genAI) {
            throw new Error("AI Service: GEMINI_API_KEY is not configured.");
        }

        try {
            const targetModel = config.model || DEFAULT_MODEL;
            const model = this.genAI.getGenerativeModel({ 
                model: targetModel,
                systemInstruction: config.systemPrompt || "You are an AI Academy by RiWoT tutor. Help the student understand the lesson material. Be concise and encouraging."
            });

            const fullPrompt = `Lesson Context:\n${context}\n\nStudent Question: ${prompt}`;
            const result = await model.generateContent(fullPrompt);
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
            return {
                content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.",
                usageContext: {
                    model: DEFAULT_MODEL,
                }
            };
        }
    }
}

export const aiService = new AIService();
