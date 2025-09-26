
import { GoogleGenAI } from "@google/genai";
import type { Idea, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const systemInstruction = `You are an expert software engineer and product strategist participating in a hackathon. Your goal is to provide constructive, insightful, and encouraging feedback on ideas. When a user provides a comment on an idea, respond as if you are another team member, building on their thoughts, asking clarifying questions, or suggesting potential technical approaches or features. Keep your tone positive, collaborative, and concise. Your response should be a single paragraph.`;

export const getCollaborativeResponse = async (idea: Idea, discussionHistory: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    const fullPrompt = `
      **Hackathon Idea:**
      Title: ${idea.title}
      Description: ${idea.description}

      **Current Discussion:**
      ${discussionHistory.map(msg => `${msg.role === 'user' ? 'Team Member' : 'AI Collaborator'}: ${msg.text}`).join('\n')}

      **New Comment from Team Member:**
      ${userMessage}

      **Your Task:**
      Respond to the new comment as the AI Collaborator. Be constructive and helpful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating collaborative response:", error);
    return "I'm having trouble connecting right now. Let's try again in a moment.";
  }
};
