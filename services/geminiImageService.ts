import { GoogleGenAI } from "@google/genai";

// As per instructions, assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // This will show up in the console if the key is missing.
    // The app should gracefully handle the error.
    console.error("Gemini API key is missing. Please set the API_KEY environment variable.");
}

// Initialize with a check for the API key to avoid runtime errors.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateAvatar = async (prompt: string): Promise<string> => {
    if (!ai) {
        throw new Error("Gemini API key is not configured. Cannot generate image.");
    }
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A vibrant, modern, abstract avatar for a sports fan profile. Style should be clean and simple, suitable for a small icon. Incorporate the theme: "${prompt}"`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
            return imageUrl;
        } else {
            throw new Error("Image generation failed, no images were returned from the API.");
        }
    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        // Provide a more user-friendly error message
        throw new Error("Failed to generate avatar. The service may be unavailable or the request may have been blocked.");
    }
};