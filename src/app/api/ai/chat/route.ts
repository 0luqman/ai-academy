import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/ai-service';

export async function POST(req: NextRequest) {
    try {
        const { prompt, context, history } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await aiService.generateResponse(prompt, context, { history });

        return NextResponse.json(response);
    } catch (error: any) {
        console.error('AI API Route Error:', error);
        return NextResponse.json({
            error: 'Failed to generate AI response',
            details: error.message
        }, { status: 500 });
    }
}
