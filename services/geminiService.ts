
import { GoogleGenAI } from "@google/genai";

export async function generateAdImage(
  base64Image: string,
  userPrompt: string,
  stylePromptSuffix: string
): Promise<string> {
  // Always create a fresh instance to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const finalPrompt = `Create a professional digital advertisement for the product in the provided image. 
  Keep the product clearly visible and as the main focal point. 
  User's creative direction: ${userPrompt}. 
  Visual style guidelines: ${stylePromptSuffix}. 
  Ensure the final output looks like a high-quality, high-converting commercial ad.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1], // Remove the data:image/png;base64, prefix
              mimeType: 'image/png',
            },
          },
          {
            text: finalPrompt
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No image generated.");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Failed to extract generated image from response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      throw new Error("API_KEY_ERROR");
    }
    throw error;
  }
}
