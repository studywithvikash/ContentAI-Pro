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
