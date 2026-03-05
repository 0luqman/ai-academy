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
    history?: { role: 'user' | 'model'; parts: { text: string }[] }[];
}

const DEFAULT_MODEL = 'gemma-3-27b-it';
const FALLBACK_MODEL = 'gemma-3-12b-it';

export class AIService {
    private genAI: GoogleGenerativeAI | null = null;

    constructor() {
        // API key should be on the server-side
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
            throw new Error("AI Service: GEMINI_API_KEY is not configured on the server.");
        }

        try {
            let targetModel = config.model || DEFAULT_MODEL;
            let model;

            const systemInstruction = config.systemPrompt || `
                You are the AI Academy by RiWoT tutor, an expert in AI, Machine Learning, and Data Science.
                Your goal is to guide students through the curriculum and help them understand complex concepts.

                CURRENT CONTEXT:
                The student is currently: ${context}

                INSTRUCTIONS:
                - Be concise, encouraging, and professional.
                - Focus on helping them solve problems themselves rather than just giving answers.
            `;

            try {
                model = this.genAI.getGenerativeModel({
                    model: targetModel,
                    systemInstruction: systemInstruction
                });
            } catch (err) {
                console.warn(`Primary model ${targetModel} failed, trying fallback...`);
                targetModel = FALLBACK_MODEL;
                model = this.genAI.getGenerativeModel({
                    model: targetModel,
                    systemInstruction: systemInstruction
                });
            }

            // Formatting history for GoogleGenerativeAI
            // Ensure roles are alternating user/model
            const formattedHistory = (config.history || []).map((msg: any) => {
                // Handle different history formats
                const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
                const text = msg.parts?.[0]?.text || msg.content || msg.text;
                return {
                    role,
                    parts: [{ text: text || "" }]
                };
            });

            const chat = model.startChat({
                history: formattedHistory,
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(prompt);
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
