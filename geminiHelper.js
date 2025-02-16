require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function processTextWithGemini(inputText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(inputText);
    
    // Ensure the response contains data
    if (!result || !result.response || !result.response.candidates) {
      console.error("Unexpected API response:", result);
      return "Error: Invalid response from Gemini API";
    }

    // Extract text output
    const responseText = result.response.candidates[0]?.content?.parts[0]?.text || "No response text";
    
    return responseText;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Error processing text.";
  }
}

module.exports = { processTextWithGemini };
