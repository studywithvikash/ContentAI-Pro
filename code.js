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
// ====================================
// AI Generate
// ====================================

const generateBtn = document.getElementById("generateCodeBtn");
const copyBtn = document.getElementById("copyCodeBtn");
const downloadBtn = document.getElementById("downloadCodeBtn");
const previewBtn = document.getElementById("previewBtn");
const saveBtn = document.getElementById("saveProjectBtn");
const clearBtn = document.getElementById("clearBtn");
const formatBtn = document.getElementById("formatBtn");

generateBtn.onclick = async ()=>{

const prompt=document.getElementById("codePrompt").value.trim();

const language=document.getElementById("language").value;

if(prompt===""){

alert("Enter your coding request.");

return;

}

document.getElementById("editorStatus").innerText="Generating...";

try{

const response=await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`Generate only ${language} code for: ${prompt}. Return code only.`

})

});

const data=await response.json();

if(data.error){

alert(data.error);

document.getElementById("editorStatus").innerText="Error";

return;

}

editor.setValue(data.text || "");

document.getElementById("editorStatus").innerText="Completed";

}
catch(err){

alert(err.message);

document.getElementById("editorStatus").innerText="Failed";

}

};

// ====================================
// Copy
// ====================================

copyBtn.onclick=()=>{

navigator.clipboard.writeText(editor.getValue());

alert("✅ Code Copied");

};

// ====================================
// Clear
// ====================================

clearBtn.onclick=()=>{

if(confirm("Clear editor?")){

editor.setValue("");

updateEditorInfo();

}

};

// ====================================
// Format
// ====================================

formatBtn.onclick=()=>{

editor.getAction("editor.action.formatDocument").run();

};
// ====================================
// Download Code
// ====================================

downloadBtn.onclick = () => {

const code = editor.getValue();

if(code.trim()===""){

alert("No code to download.");

return;

}

const language=document.getElementById("language").value;

let fileName="code.txt";

switch(language){

case "HTML":
fileName="index.html";
break;

case "CSS":
fileName="style.css";
break;

case "JavaScript":
fileName="script.js";
break;

case "Python":
fileName="main.py";
break;

case "Java":
fileName="Main.java";
break;

case "C++":
fileName="main.cpp";
break;

case "PHP":
fileName="index.php";
break;

case "React":
fileName="App.jsx";
break;

}

const blob=new Blob([code],{type:"text/plain"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download=fileName;

a.click();

URL.revokeObjectURL(url);

};

// ====================================
// Live Preview
// ====================================

previewBtn.onclick=()=>{

const language=document.getElementById("language").value;

if(language!=="HTML"){

alert("Live Preview works only for HTML.");

return;

}

const preview=window.open();

preview.document.open();

preview.document.write(editor.getValue());

preview.document.close();

};

// ====================================
// Save Project
// ====================================

saveBtn.onclick=()=>{

const title=document.getElementById("codePrompt").value.trim();

if(title===""){

alert("Enter project title.");

return;

}

const projects=JSON.parse(localStorage.getItem("projects"))||[];

projects.unshift({

title:title,

category:document.getElementById("category").value,

language:document.getElementById("language").value,

code:editor.getValue(),

created:new Date().toLocaleString(),

favorite:false

});

localStorage.setItem("projects",JSON.stringify(projects));

alert("✅ Project Saved");

};

// ====================================
// Open Saved Project
// ====================================

const currentProject=JSON.parse(localStorage.getItem("currentProject"));

if(currentProject){

window.addEventListener("load",()=>{

document.getElementById("codePrompt").value=currentProject.title;

document.getElementById("language").value=currentProject.language;

document.getElementById("category").value=currentProject.category || "Other";

setTimeout(()=>{

if(editor){

editor.setValue(currentProject.code);

}

},500);

});

}
