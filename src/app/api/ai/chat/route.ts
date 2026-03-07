import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/ai-service';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt, context, history, model, messages } = body;

        // Support both old and new payload formats
        const userPrompt = prompt || body.message;
        const chatHistory = (history || messages || []).map((m: any) => ({
            role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text || m.content || "" }]
        }));

        if (!userPrompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await aiService.generateResponse(userPrompt, context || "General AI Assistant", {
            history: chatHistory,
            model: model
        });

        // Return in a format compatible with both mini-chat and full-screen chat
        return NextResponse.json({
            ...response,
            reply: response.content // For compatibility with some frontend versions
        });
    } catch (error: any) {
        console.error('AI API Route Error:', error);

        if (error.status === 429) {
            return NextResponse.json({
                error: 'AI is currently busy (Rate Limit). Please wait a moment and try again.',
            }, { status: 429 });
        }

        return NextResponse.json({
            error: 'Failed to generate AI response',
            details: error.message
        }, { status: 500 });
    }
}
