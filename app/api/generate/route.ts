import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Allow fallback if no API key is provided for MVP testing
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    // Check if we're using a mock key
    if (process.env.OPENAI_API_KEY === undefined || process.env.OPENAI_API_KEY === '') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        hypotheses: [
          "Users are currently frustrated with manual processes and willing to pay for automation.",
          "Founders struggle to structure user interviews and need a guided framework.",
          "A bento-grid dashboard will increase user engagement by 40% compared to a standard list view."
        ]
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert startup advisor. Given a startup idea, generate 3 highly specific, testable validation hypotheses. Return ONLY a JSON array of strings, nothing else." 
        },
        { 
          role: "user", 
          content: `Generate validation hypotheses for this idea: ${idea}` 
        }
      ],
      response_format: { type: "json_object" } // Enforce JSON
    });

    const responseContent = completion.choices[0].message.content;
    let hypotheses = [];
    
    try {
      const parsed = JSON.parse(responseContent || '{"hypotheses": []}');
      hypotheses = parsed.hypotheses || parsed; // Handle different potential JSON structures
      if (!Array.isArray(hypotheses)) hypotheses = [responseContent];
    } catch {
      hypotheses = [responseContent];
    }

    return NextResponse.json({ hypotheses });
  } catch (error) {
    console.error('Error generating hypotheses:', error);
    return NextResponse.json({ error: 'Failed to generate hypotheses' }, { status: 500 });
  }
}
