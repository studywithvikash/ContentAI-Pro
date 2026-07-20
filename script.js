console.log("ContentAI Pro Started");

const generateBtn = document.getElementById("generateBtn");

if(generateBtn){

generateBtn.addEventListener("click", function(){

const topic = document.getElementById("topic").value;
const type = document.getElementById("type").value;
const tone = document.getElementById("tone").value;
const length = document.getElementById("length").value;

const output = document.getElementById("output");

if(topic === ""){
  output.innerHTML = "Please enter a topic first.";
  return;
}

output.innerHTML = "✨ Creating your AI content...";

setTimeout(()=>{

output.innerHTML = `
<h3>${type}</h3>

<p><b>Topic:</b> ${topic}</p>

<p>
<b>Tone:</b> ${tone}<br>
<b>Length:</b> ${length}
</p>

<p>
${topic} is an important topic in today's digital world.
This content is written in a ${tone} style.
It helps readers understand the topic and create valuable ideas.
</p>

`;
let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

history.push({
topic: topic,
type: type,
content: output.innerText
});

localStorage.setItem("contentHistory", JSON.stringify(history));

showHistory();
},1500);

});

}
function showHistory(){

const historyList = document.getElementById("historyList");

if(!historyList) return;

let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

if(history.length === 0){
historyList.innerHTML = "No history yet...";
return;
}

historyList.innerHTML = "";

history.forEach(item=>{

historyList.innerHTML += `
<div class="history-item">
<h4>${item.type}</h4>
<p>${item.topic}</p>
</div>
`;

});

}
