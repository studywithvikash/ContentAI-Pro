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

const topic=document.getElementById("topic").value.trim();
const type=document.getElementById("type").value;
const tone=document.getElementById("tone").value;
const length=document.getElementById("length").value;

if(topic===""){

alert("Please enter a topic.");

return;

}

output.innerHTML="🤖 AI is writing...";

try{

const response=await fetch("/api/generate",{

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
