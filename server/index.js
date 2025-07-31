require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cache = new Map();


async function generateWithRetry(prompt, retries = 3, delay = 2000) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      return text.trim();
    } catch (err) {
      const code = err?.response?.status || err.code || err.message;
      console.warn(`⚠️ Retry ${i + 1} failed (${code})`);
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
}


app.post('/log-form', (req, res) => {
  console.log('📝 Received form submission:');
  console.log('Action:', req.body.action);
  console.log('Method:', req.body.method);
  console.log('Data:', req.body.data);

  res.json({ message: 'Form received successfully' });
});


app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }


  if (cache.has(url)) {
    return res.json({ analysis: cache.get(url) });
  }

  const prompt = `
You are an AI security assistant. Analyze the following website and tell me if it is trustworthy, if it might be phishing, and if it has an official license or security certificate.

Website: ${url}

Return your answer in a short and clear summary, no more than 4 lines. Do not add explanations or steps.
  `;

  try {
    const analysis = await generateWithRetry(prompt);
    cache.set(url, analysis); 
    res.json({ analysis });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(503).json({ error: "Gemini is overloaded. Please try again shortly." });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
