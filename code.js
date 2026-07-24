// ======================================
// ContentAI Pro v4.0
// code.js - Part 1
// Monaco Editor Initialization
// ======================================

let editor = null;

// DOM Elements
const codePrompt = document.getElementById("codePrompt");
const language = document.getElementById("language");
const category = document.getElementById("category");

const generateBtn = document.getElementById("generateCodeBtn");
const copyBtn = document.getElementById("copyCodeBtn");
const downloadBtn = document.getElementById("downloadCodeBtn");
const previewBtn = document.getElementById("previewBtn");
const saveBtn = document.getElementById("saveProjectBtn");

const formatBtn = document.getElementById("formatBtn");
const clearBtn = document.getElementById("clearBtn");

const currentLanguage = document.getElementById("currentLanguage");
const editorStatus = document.getElementById("editorStatus");
const lineCount = document.getElementById("lineCount");
const charCount = document.getElementById("charCount");

// Monaco Loader
require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
    }
});

require(["vs
// ======================================
// AI Code Generation
// ======================================

generateBtn.addEventListener("click", async () => {

    if (!editor) {
        alert("Editor is still loading...");
        return;
    }

    const prompt = codePrompt.value.trim();

    if (prompt === "") {
        alert("Please enter your coding request.");
        return;
    }

    editorStatus.innerText = "Generating...";

    generateBtn.disabled = true;
    generateBtn.innerText = "Generating...";

    try {

        const response = await fetch("/api/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prompt: `Generate only ${language.value} code.

Task:
${prompt}

Return only code without markdown and without explanation.`

            })

        });

        const data = await response.json();

        if (data.error) {

            editorStatus.innerText = "Error";

            alert(data.error);

            return;

        }

        let code = data.text || "";

        // Remove Markdown
        code = code.replace(/```[a-zA-Z]*/g, "");

        code = code.replace(/```/g, "");

        editor.setValue(code.trim());

        updateEditorInfo();

        editorStatus.innerText = "Completed";

    } catch (err) {

        editorStatus.innerText = "Failed";

        alert(err.message);

    } finally {

        generateBtn.disabled = false;

        generateBtn.innerText = "⚡ Generate";

    }

});
// ======================================
// Copy Code
// ======================================

copyBtn.addEventListener("click", () => {

    if (!editor) return;

    const code = editor.getValue();

    if (code.trim() === "") {
        alert("No code to copy.");
        return;
    }

    navigator.clipboard.writeText(code);

    alert("✅ Code Copied Successfully");

});

// ======================================
// Download Code
// ======================================

downloadBtn.addEventListener("click", () => {

    if (!editor) return;

    const code = editor.getValue();

    if (code.trim() === "") {
        alert("No code to download.");
        return;
    }

    let fileName = "code.txt";

    switch (language.value) {

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

        case "Java":
            fileName = "Main.java";
            break;

        case "C++":
            fileName = "main.cpp";
            break;

        case "PHP":
            fileName = "index.php";
            break;

        case "React":
            fileName = "App.jsx";
            break;

    }

    const blob
