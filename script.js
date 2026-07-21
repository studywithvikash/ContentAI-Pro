console.log("ContentAI Pro Started");

// ===========================
// Elements
// ===========================

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const output = document.getElementById("output");

const historyList = document.getElementById("historyList");

const usageCount = document.getElementById("usageCount");

const progressBar = document.getElementById("progressBar");


// ===========================
// Show History
// ===========================

function showHistory(){

let history =
JSON.parse(localStorage.getItem("contentHistory")) || [];

if(history.length===0){

historyList.innerHTML=
"No history yet...";

}else{

historyList.innerHTML="";

history.forEach(item=>{

historyList.innerHTML += `
<div class="history-item">

<h4>${item.topic}</h4>

<p>${item.type}</p>

<small>${item.date}</small>

</div>
`;

});

}

updateUsage();

}


// ===========================
// Usage Counter
// ===========================

function updateUsage(){

let history =
JSON.parse(localStorage.getItem("contentHistory")) || [];

const used =
Math.min(history.length,20);

usageCount.innerText =
`${used} / 20`;

progressBar.style.width =
(used*5)+"%";

}


// ===========================
// Load on Start
// ===========================

showHistory();
