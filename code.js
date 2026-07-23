const generateBtn = document.getElementById("generateCodeBtn");
const copyBtn = document.getElementById("copyCodeBtn");
const output = document.getElementById("codeOutput");

generateBtn.addEventListener("click", async () => {

    const prompt = document.getElementById("codePrompt").value.trim();
    const language = document.getElementById("language").value;

    if (!prompt) {
        alert("Please enter your coding request.");
        return;
    }

    output.textContent = "⚡ Generating Code...";

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: `Generate only ${language} code for: ${prompt}. Do not include explanations unless necessary.`
            })
        });

        const data = await response.json();

        if (data.error) {
            output.textContent = data.error;
            return;
        }

        output.textContent = data.text;

    } catch (err) {

        output.textContent = err.message;

    }

});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(output.textContent);

    alert("✅ Code copied!");

});
