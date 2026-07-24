export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    const { prompt, type, tone, length, language } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const finalPrompt = `
You are an expert AI Content Writer.

Generate a ${length || "Medium"} ${type || "General Content"}.

Topic:
${prompt}

Writing Style:
${tone || "Professional"}
Language:
${language || "English"}
Rules:
- Create only ${type || "General Content"}.
- Write the content only in ${language || "English"}.
- Use clear headings if needed.
- Make it unique and engaging.
- Do not explain what you are doing.
- Return only the final content.
`;

    const response = await fetch(
      "https://throbbing-mouse-eb03.nayakbhai5439.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: finalPrompt
        })
      }
    );

     console.log(data);

return res.status(200).json({
  text: data.text || data.response || "No content generated."
});

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
