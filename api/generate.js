import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite"
      contents: prompt
    });

    return res.status(200).json({
      text: response.text
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to generate content"
    });

  }

}
