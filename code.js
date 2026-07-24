// ====================================
// ContentAI Pro v4.0
// Monaco Editor
// Part 1
// ====================================

let editor;

// Monaco Loader
require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
    }
});

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(document.getElementById("editor"), {

        value: "// Welcome to ContentAI Pro\n\n// AI Generated code will appear here...\n",

        language: "html",

        theme: "vs-dark",

        automaticLayout: true,

        fontSize: 16,

        roundedSelection: true,

        minimap: {
            enabled: true
        },

        scrollBeyondLastLine: false

    });

    updateEditorInfo();

    editor.onDidChangeModelContent(() => {

        updateEditorInfo();

    });

});

// ===============================
// Editor Information
// ===============================

function updateEditorInfo(){

    if(!editor) return;

    const code = editor.getValue();

    document.getElementById("charCount").innerText = code.length;

    document.getElementById("lineCount").innerText =
        code.split("\n").length;

}

// ===============================
// Language Change
// ===============================

document.getElementById("language")

.addEventListener("change", function(){

    const lang = this.value;

    document.getElementById("currentLanguage").innerText = lang;

    let monacoLang = "plaintext";

    switch(lang){

        case "HTML":
            monacoLang="html";
            break;

        case "CSS":
            monacoLang="css";
            break;

        case "JavaScript":
            monacoLang="javascript";
            break;

        case "Python":
            monacoLang="python";
            break;

        case "Java":
            monacoLang="java";
            break;

        case "PHP":
            monacoLang="php";
            break;

        case "C++":
            monacoLang="cpp";
            break;

        case "React":
            monacoLang="javascript";
            break;

    }

    monaco.editor.setModelLanguage(
        editor.getModel(),
        monacoLang
    );

});
