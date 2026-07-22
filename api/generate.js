const finalPrompt = `
You are a professional AI content writer.

Content Type: ${type}
Tone: ${tone}
Length: ${length}

Topic:
${prompt}

Write high-quality content only.
`;
body: JSON.stringify({
  prompt: finalPrompt
})
