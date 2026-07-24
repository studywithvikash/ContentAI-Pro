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

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(
        document.getElementById("editor"),
        {

            value: "// Welcome to ContentAI Pro\n",

            language: "html",

            theme: "vs-dark",

            automaticLayout: true,

            fontSize: 15,

            minimap: {
                enabled: true
            },

            scrollBeyondLastLine: false

        }
    );

    editorStatus.innerText = "Ready";

    updateEditorInfo();

    editor.onDidChangeModelContent(() => {

        updateEditorInfo();

    });

});

// ==========================
// Update Editor Info
// ==========================

function updateEditorInfo() {

    if (!editor) return;

    const code = editor.getValue();

    charCount.innerText = code.length;

    lineCount.innerText = code.split("\n").length;

}

// ==========================
// Change Language
// ==========================

language.addEventListener("change", () => {

    if (!editor) return;

    currentLanguage.innerText = language.value;

    const map = {

        "HTML":"html",

        "CSS":"css",

        "JavaScript":"javascript",

        "Python":"python",

        "Java":"java",

        "PHP":"php",

        "C++":"cpp",

        "React":"javascript"

    };

    monaco.editor.setModelLanguage(

        editor.getModel(),

        map[language.value] || "plaintext"

    );

});
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

    const blob = new Blob([code], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});

// ======================================
// Live Preview
// ======================================

previewBtn.addEventListener("click", () => {

    if (!editor) return;

    if (language.value !== "HTML") {

        alert("Live Preview is available only for HTML.");

        return;

    }

    const previewWindow = window.open("", "_blank");

    previewWindow.document.open();

    previewWindow.document.write(editor.getValue());

    previewWindow.document.close();

});

// ======================================
// Clear Editor
// ======================================

clearBtn.addEventListener("click", () => {

    if (!editor) return;

    if (confirm("Clear all code?")) {

        editor.setValue("");

        updateEditorInfo();

        editorStatus.innerText = "Ready";

    }

});

// ======================================
// Format Code
// ======================================

formatBtn.addEventListener("click", async () => {

    if (!editor) return;

    await editor.getAction("editor.action.formatDocument").run();

    editorStatus.innerText = "Formatted";

});
// ======================================
// Save Project
// ======================================

saveBtn.addEventListener("click", () => {

    if (!editor) {
        alert("Editor is loading...");
        return;
    }

    const title = codePrompt.value.trim();

    if (title === "") {
        alert("Please enter project title.");
        return;
    }

    const project = {

        id: Date.now(),

        title: title,

        category: category.value,

        language: language.value,

        code: editor.getValue(),

        created: new Date().toLocaleString(),

        updated: new Date().toLocaleString(),

        favorite: false

    };

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    projects.unshift(project);

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    editorStatus.innerText = "Project Saved";

    alert("✅ Project Saved Successfully");

});

// ======================================
// Open Saved Project
// ======================================

window.addEventListener("load", () => {

    const currentProject =
        JSON.parse(localStorage.getItem("currentProject"));

    if (!currentProject) return;

    codePrompt.value = currentProject.title;

    language.value = currentProject.language;

    category.value =
        currentProject.category || "Other";

    const wait = setInterval(() => {

        if (editor) {

            editor.setValue(currentProject.code);

            const map = {

                HTML: "html",

                CSS: "css",

                JavaScript: "javascript",

                Python: "python",

                Java: "java",

                "C++": "cpp",

                PHP: "php",

                React: "javascript"

            };

            monaco.editor.setModelLanguage(

                editor.getModel(),

                map[currentProject.language] || "plaintext"

            );

            currentLanguage.innerText =
                currentProject.language;

            updateEditorInfo();

            editorStatus.innerText = "Project Loaded";

            clearInterval(wait);

        }

    }, 100);

});

// ======================================
// Auto Save Draft
// ======================================

setInterval(() => {

    if (!editor) return;

    localStorage.setItem(
        "draftCode",
        editor.getValue()
    );

}, 5000);

// ======================================
// Restore Draft
// ======================================

window.addEventListener("load", () => {

    const draft =
        localStorage.getItem("draftCode");

    if (!draft) return;

    const wait = setInterval(() => {

        if (editor) {

            if (editor.getValue().trim() === "") {

                editor.setValue(draft);

                updateEditorInfo();

            }

            clearInterval(wait);

        }

    }, 100);

});
