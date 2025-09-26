
import { GoogleGenAI, Type } from "@google/genai";
import type { Idea, Comment, TechStackSuggestion } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const refineIdeaWithAI = async (title: string, description: string): Promise<{ newTitle: string; newDescription: string; }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert in product development and hackathons. Refine the following idea to make it more compelling, clear, and concise.
      Idea Title: '${title}'
      Idea Description: '${description}'
      Respond in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            newTitle: { type: Type.STRING },
            newDescription: { type: Type.STRING },
          },
          required: ["newTitle", "newDescription"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error refining idea with AI:", error);
    throw new Error("Failed to refine idea. Please try again.");
  }
};

export const summarizeCommentsWithAI = async (idea: Idea): Promise<string> => {
    if (idea.comments.length === 0) {
        return "There are no comments to summarize yet.";
    }

    try {
        const formattedComments = idea.comments.map(c => `${c.author}: "${c.text}"`).join('\n');
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize the key points, questions, and action items from the following discussion thread about the hackathon idea titled "${idea.title}".
            The discussion is:
            ${formattedComments}

            Provide a concise summary as a short paragraph.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing comments with AI:", error);
        throw new Error("Failed to summarize discussion. Please try again.");
    }
};

export const suggestTechStackWithAI = async (idea: Idea): Promise<TechStackSuggestion> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following hackathon idea description, suggest a potential technology stack (frontend, backend, database, deployment). Explain why each technology is a good choice for a rapid prototype for this specific idea.
            Idea: "${idea.title} - ${idea.description}"
            Respond in JSON format.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        frontend: {
                            type: Type.OBJECT,
                            properties: {
                                tech: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            }
                         },
                        backend: {
                            type: Type.OBJECT,
                            properties: {
                                tech: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            }
                         },
                        database: {
                            type: Type.OBJECT,
                            properties: {
                                tech: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            }
                         },
                        deployment: {
                            type: Type.OBJECT,
                            properties: {
                                tech: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            }
                         },
                    },
                    required: ["frontend", "backend", "database", "deployment"],
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error suggesting tech stack with AI:", error);
        throw new Error("Failed to suggest tech stack. Please try again.");
    }
};
