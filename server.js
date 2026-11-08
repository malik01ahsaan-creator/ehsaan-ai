const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, style, size, quality } = req.body || {};
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return res.status(400).json({ error: "Please enter a longer image description." });
    }
    if (prompt.length > 4000) return res.status(400).json({ error: "Prompt is too long." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Server setup is incomplete: add OPENAI_API_KEY to your server environment." });
    }

    const allowedSizes = ["1024x1024", "1536x1024", "1024x1536"];
    const allowedQualities = ["low", "medium", "high"];
    const finalPrompt = `${prompt.trim()}. Visual style: ${String(style || "Photorealistic").slice(0, 160)}. Create an original, polished image.`;

    const apiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-2.5-flare",
        prompt: finalPrompt,
        size: allowedSizes.includes(size) ? size : "1024x1024",
        quality: allowedQualities.includes(quality) ? quality : "medium",
        output_format: "png",
        n: 1
      })
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      const message = data?.error?.message || "The image service returned an error.";
      return res.status(apiResponse.status).json({ error: message });
    }
    const encoded = data?.data?.[0]?.b64_json;
    if (!encoded) return res.status(502).json({ error: "No image was returned by the image service." });
    return res.json({ image: `data:image/png;base64,${encoded}` });
  } catch (error) {
    console.error("Generation error:", error);
    return res.status(500).json({ error: "Unexpected server error. Please try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Ehsaan AI is running at http://localhost:${port}`));
