import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";

export async function POST(req: NextRequest) {
    try {
        const { prompt, context, history } = await req.json();

        // Pass conversation history and current prompt to AIService for memory
        const response = await aiService.generateResponse(
            prompt,
            context || "General AI Academy context.",
            history || []
        );

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("AI API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
