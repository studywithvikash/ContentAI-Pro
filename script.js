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

let content = `
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

output.innerHTML = content;


// Save History
let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

history.push({
topic: topic,
type: type
});

localStorage.setItem("contentHistory", JSON.stringify(history));


},1500);

});

}
