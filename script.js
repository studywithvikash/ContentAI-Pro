alert("Script Loaded");
console.log("ContentAI Pro Started");

// Elements
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// ---------- Show History ----------
function showHistory() {

  const historyList = document.getElementById("historyList");
  const usageCount = document.getElementById("usageCount");
  const progressBar = document.getElementById("progressBar");

  if (!historyList) return;

  let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

  if (history.length === 0) {
    historyList.innerHTML = "No history yet...";
  } else {

    historyList.innerHTML = "";

    history.forEach(item => {

      historyList.innerHTML += `
      <div class="history-item">
        <h4>${item.topic}</h4>
        <p>${item.type}</p>
        <small>${item.date}</small>
      </div>
      `;

    });

  }

  // Usage Counter
  if (usageCount && progressBar) {

    const used = Math.min(history.length,20);

    usageCount.innerText = `${used} / 20`;

    progressBar.style.width = (used*5)+"%";

  }

}

showHistory();


// ---------- Generate ----------
if(generateBtn){

generateBtn.addEventListener("click", async function(){

const topic=document.getElementById("topic").value.trim();
const type=document.getElementById("type").value;
const tone=document.getElementById("tone").value;
const length=document.getElementById("length").value;

const output=document.getElementById("output");

if(topic===""){

output.innerHTML="Please enter a topic.";

return;

}

output.innerHTML="🤖 AI is writing...";

try{

alert("Button Clicked");
alert("Sending request...");

const response = await fetch("/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: `Write a ${length} ${type} in ${tone} tone about ${topic}.`
  })
});

alert("Response received");

const data=await response.json();

if(!response.ok){

throw new Error(data.error || "Server Error");

}

output.innerHTML=data.text;

// Save History

let history=JSON.parse(localStorage.getItem("contentHistory")) || [];

history.unshift({

topic:topic,

type:type,

tone:tone,

length:length,

date:new Date().toLocaleString()

});

localStorage.setItem("contentHistory",JSON.stringify(history));

showHistory();

}catch(error){

console.error(error);

output.innerHTML="❌ "+error.message;

}

});

}


// ---------- Copy ----------

if(copyBtn){

copyBtn.addEventListener("click",function(){

const text=document.getElementById("output").innerText;

navigator.clipboard.writeText(text)

.then(()=>{

alert("✅ Copied!");

})

.catch(()=>{

alert("Copy Failed");

});

});

}


// ---------- Clear History ----------

if(clearHistoryBtn){

clearHistoryBtn.addEventListener("click",function(){

if(confirm("Clear all history?")){

localStorage.removeItem("contentHistory");

showHistory();

alert("History Cleared");

}

});

}
