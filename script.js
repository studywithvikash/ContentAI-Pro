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
// ===========================
// Generate AI Content
// ===========================

if(generateBtn){

generateBtn.addEventListener("click", async ()=>{

const prompt = document.getElementById("prompt").value;
const type = document.getElementById("contentType").value;
const tone = document.getElementById("tone").value;
const length = document.getElementById("length").value;

const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        prompt,
        type,
        tone,
        length
    })
});

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`Write a ${length} ${type} in ${tone} tone about ${topic}.`

})

});

const data=await response.json();

if(!response.ok){

throw new Error(data.error || "Server Error");

}

output.innerHTML=data.text;


// Save History

let history=

JSON.parse(localStorage.getItem("contentHistory")) || [];

history.unshift({

topic,

type,

tone,

length,

date:new Date().toLocaleString()

});

if(history.length>20){

history=history.slice(0,20);

}

localStorage.setItem(

"contentHistory",

JSON.stringify(history)

);

showHistory();

}catch(error){

console.error(error);

output.innerHTML=

"❌ "+error.message;

}

});

}
// ===========================
// Copy Content
// ===========================

if(copyBtn){

copyBtn.addEventListener("click",async()=>{

const text=output.innerText.trim();

if(text==="" || text==="Your AI generated content will appear here..."){

alert("Nothing to copy!");

return;

}

try{

await navigator.clipboard.writeText(text);

alert("✅ Content Copied!");

}catch(error){

const textarea=document.createElement("textarea");

textarea.value=text;

document.body.appendChild(textarea);

textarea.select();

document.execCommand("copy");

document.body.removeChild(textarea);

alert("✅ Content Copied!");

}

});

}


// ===========================
// Clear History
// ===========================

if(clearHistoryBtn){

clearHistoryBtn.addEventListener("click",()=>{

const ok=confirm("Are you sure you want to clear all history?");

if(!ok) return;

localStorage.removeItem("contentHistory");

showHistory();

output.innerHTML="Your AI generated content will appear here...";

alert("✅ History Cleared");

});

}


// ===========================
// Auto Refresh Usage
// ===========================

window.addEventListener("load",()=>{

showHistory();

});
