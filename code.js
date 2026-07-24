const previewBtn = document.getElementById("previewBtn");
const downloadBtn = document.getElementById("downloadCodeBtn");
const generateBtn = document.getElementById("generateCodeBtn");
const copyBtn = document.getElementById("copyCodeBtn");
const output = document.getElementById("codeOutput");
const saveProjectBtn = document.getElementById("saveProjectBtn");
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
downloadBtn.addEventListener("click", () => {

    const code = output.textContent;

    if (!code || code.includes("Generated code")) {
        alert("Generate code first.");
        return;
    }

    const language = document.getElementById("language").value;

    let fileName = "code.txt";

    switch(language){

        case "HTML":
            fileName = "index.html";
            break;

        case "CSS":
            fileName = "style.css";
            break;

        case "JavaScript":
            fileName = "script.js";
            break;

        case "Python":
            fileName = "main.py";
            break;

        case "C++":
            fileName = "main.cpp";
            break;

        case "Java":
            fileName = "Main.java";
            break;

        case "PHP":
            fileName = "index.php";
            break;

        case "React":
            fileName = "App.jsx";
            break;
    }

    const blob = new Blob([code], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;

    a.click();

    URL.revokeObjectURL(url);

});
previewBtn.addEventListener("click", () => {

    const code = output.textContent;
    const language = document.getElementById("language").value;

    if (!code || code.includes("Generated code")) {
        alert("Generate code first.");
        return;
    }

    if (language !== "HTML") {
        alert("Live Preview is available only for HTML.");
        return;
    }

    const previewWindow = window.open("", "_blank");

    previewWindow.document.open();
    previewWindow.document.write(code);
    previewWindow.document.close();

});
saveProjectBtn.addEventListener("click", () => {

    const prompt = document.getElementById("codePrompt").value.trim();
    const language = document.getElementById("language").value;
    const code = output.textContent;
    const category =
document.getElementById("category").value;
    if (!prompt || !code || code.includes("Generated code")) {
        alert("Generate code first.");
        return;
    }

    const projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    projects.unshift({
        title: prompt,
        language: language,
        code: code,
        created: new Date().toLocaleString()
    });

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    alert("✅ Project Saved!");

});
