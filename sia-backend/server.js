const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ SIA Backend is running");
});

// ✅ /chat route now uses OpenAI
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User:", userMessage);

    // ✅ Call OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are SIA, a friendly, empathetic mental health support AI." },
        { role: "user", content: userMessage }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("SIA:", reply);

    res.json({ reply });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
