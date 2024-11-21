// src/app/api/review/route.ts
import { NextRequest } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      maxOutputTokens: 2048,
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3,
    });

    const reviewPrompt = PromptTemplate.fromTemplate(`
      Review this code and provide:
      1. Quality Score (0-100)
      2. Brief explanation for the score
      3. Main strengths
      4. Key improvements needed

      Code:
      {code}

      Provide the review in this format:
      Score: [number]
      Reasoning: [explanation]
      Strengths:
      - [point]
      Improvements:
      - [point]
    `);

    // Format the prompt with our code
    const formattedPrompt = await reviewPrompt.format({ code });

    const review = await model.invoke([
      ["human", formattedPrompt]
    ]);

    return Response.json({ review: review.content });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}