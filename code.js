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

// AI response दिखाओ
output.textContent = data.text;

// Language class बदलो
output.className = "";

switch(language){
    case "HTML":
        output.classList.add("language-html");
        break;
    case "CSS":
        output.classList.add("language-css");
        break;
    case "JavaScript":
        output.classList.add("language-javascript");
        break;
    case "Python":
        output.classList.add("language-python");
        break;
    case "C++":
        output.classList.add("language-cpp");
        break;
    case "Java":
        output.classList.add("language-java");
        break;
    case "PHP":
        output.classList.add("language-php");
        break;
    case "React":
        output.classList.add("language-javascript");
        break;
}

// Highlight लागू करो
hljs.highlightElement(output);

    } catch (err) {

        output.textContent = err.message;

    }

});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(output.textContent);

    alert("✅ Code copied!");

});
