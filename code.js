// ================================
// ContentAI Pro v2.0
// code.js - Part 1
// Monaco Editor Setup
// ================================

// Buttons
const generateBtn = document.getElementById("generateCodeBtn");
const copyBtn = document.getElementById("copyCodeBtn");
const downloadBtn = document.getElementById("downloadCodeBtn");
const previewBtn = document.getElementById("previewBtn");
const saveProjectBtn = document.getElementById("saveProjectBtn");

// Inputs
const promptInput = document.getElementById("codePrompt");
const languageSelect = document.getElementById("language");
const categorySelect = document.getElementById("category");

// Monaco Editor
let editor;

// Monaco Loader
require.config({
paths:{
vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
}
});

// Create Editor
require(["vs/editor/editor.main"],function(){

editor = monaco.editor.create(

document.getElementById("editor"),

{

value:
// Welcome to ContentAI Pro\n// AI Generated Code will appear here...

,

language:"html",

theme:"vs-dark",

automaticLayout:true,

fontSize:15,

roundedSelection:true,

scrollBeyondLastLine:false,

minimap:{
enabled:true
}

}

);

});

// Change Language Automatically
languageSelect.addEventListener("change",()=>{

if(!editor) return;

let lang="plaintext";

switch(languageSelect.value){

case "HTML":
lang="html";
break;

case "CSS":
lang="css";
break;

case "JavaScript":
lang="javascript";
break;

case "Python":
lang="python";
break;

case "Java":
lang="java";
break;

case "C++":
lang="cpp";
break;

case "PHP":
lang="php";
break;

case "React":
lang="javascript";
break;

}

monaco.editor.setModelLanguage(
editor.getModel(),
lang
);

});
// ================================
// AI Code Generation
// ================================

generateBtn.addEventListener("click", async () => {

const prompt = promptInput.value.trim();

const language = languageSelect.value;

if(!prompt){

alert("Please enter your coding request.");

return;

}

editor.setValue("⚡ Generating AI Code...");

try{

const response = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`Generate only ${language} code for: ${prompt}. Do not include explanations unless necessary.`

})

});

const data = await response.json();

if(data.error){

editor.setValue("❌ " + data.error);

return;

}

editor.setValue(data.text);

// Update Monaco Language

let lang="plaintext";

switch(language){

case "HTML":
lang="html";
break;

case "CSS":
lang="css";
break;

case "JavaScript":
lang="javascript";
break;

case "Python":
lang="python";
break;

case "Java":
lang="java";
break;

case "C++":
lang="cpp";
break;

case "PHP":
lang="php";
break;

case "React":
lang="javascript";
break;

}

monaco.editor.setModelLanguage(

editor.getModel(),

lang

);

}catch(err){

editor.setValue("❌ " + err.message);

}

});
``
// ================================
// Copy Code
// ================================

copyBtn.addEventListener("click",()=>{

if(!editor){
alert("Editor not ready.");
return;
}

navigator.clipboard.writeText(editor.getValue());

alert("✅ Code Copied!");

});

// ================================
// Download Code
// ================================

downloadBtn.addEventListener("click",()=>{

if(!editor){
alert("Editor not ready.");
return;
}

const code = editor.getValue();

if(!code.trim()){
alert("Generate code first.");
return;
}

let fileName="code.txt";

switch(languageSelect.value){

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

const blob=new Blob([code],{
type:"text/plain"
});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;
a.download=fileName;

a.click();

URL.revokeObjectURL(url);

});

// ================================
// Live HTML Preview
// ================================

previewBtn.addEventListener("click",()=>{

if(!editor){
alert("Editor not ready.");
return;
}

const code=editor.getValue();

if(languageSelect.value!=="HTML"){

alert("Live Preview works only for HTML.");

return;

}

const preview=window.open("","_blank");

preview.document.open();
preview.document.write(code);
preview.document.close();

});
// ================================
// Save Project
// ================================

saveProjectBtn.addEventListener("click",()=>{

if(!editor){
alert("Editor not ready.");
return;
}

const prompt = promptInput.value.trim();

const language = languageSelect.value;

const category = categorySelect
? categorySelect.value
: "Other";

const code = editor.getValue();
