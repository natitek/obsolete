import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: ["https://obsolete-two.vercel.app/", "*"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

const port = process.env.PORT || 3000;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
app.get("/", () => {
  console.log("working");
});

app.post("/analyze", async (req, res) => {
  try {
    console.log("reached backend from b");
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze the job title "${jobTitle}" for AI automation risk. Return a JSON object with the following keys: "automationPercentage", "riskLevel", "reasoning", "options".
    - "automationPercentage" should be a number between 0 and 100.
    - "riskLevel" should be one of "Low", "Medium", "Spicy", or "Extinct".
    - "reasoning" should be a 1-sentence witty explanation.
    - "options" should be an array of strings with possible career paths unaffected by AI.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // The model returns the JSON in a markdown code block, so we need to clean it up.
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "");
    const jsonResponse = JSON.parse(cleanedText);

    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to analyze job title" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
