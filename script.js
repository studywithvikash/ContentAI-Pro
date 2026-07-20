console.log("ContentAI Pro Started");

const generateBtn = document.getElementById("generateBtn");

// Show History
function showHistory() {

  const historyList = document.getElementById("historyList");

  if (!historyList) return;

  let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

  if (history.length === 0) {
    historyList.innerHTML = "No history yet...";
    return;
  }

  historyList.innerHTML = "";

  history.forEach(function(item) {

    historyList.innerHTML += `
      <div class="history-item">
        <h4>${item.topic}</h4>
        <p>Type: ${item.type}</p>
        <p>Tone: ${item.tone}</p>
        <small>${item.date}</small>
      </div>
    `;

  });

}

// Generate Content
if (generateBtn) {

  generateBtn.addEventListener("click", function () {

    const topic = document.getElementById("topic").value;
    const type = document.getElementById("type").value;
    const tone = document.getElementById("tone").value;
    const length = document.getElementById("length").value;
    const output = document.getElementById("output");

    if (topic.trim() === "") {
      output.innerHTML = "Please enter a topic first.";
      return;
    }

    output.innerHTML = "✨ Creating your AI content...";

    setTimeout(function () {

      let content = `
        <h3>${type}</h3>

        <p><b>Topic:</b> ${topic}</p>

        <p>
        <b>Tone:</b> ${tone}<br>
        <b>Length:</b> ${length}
        </p>

        <p>
        ${topic} is an important topic in today's digital world.
        This content is written in a ${tone.toLowerCase()} style.
        You can expand and customize it further.
        </p>
      `;

      output.innerHTML = content;

      let history = JSON.parse(localStorage.getItem("contentHistory")) || [];

      history.unshift({
        topic: topic,
        type: type,
        tone: tone,
        length: length,
        date: new Date().toLocaleString()
      });

      localStorage.setItem("contentHistory", JSON.stringify(history));

      showHistory();

    }, 1500);

  });

}

// Load history when page opens
showHistory();
const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {

  copyBtn.addEventListener("click", function () {

    const output = document.getElementById("output");

    const text = output.innerText;

    if (navigator.clipboard) {

      navigator.clipboard.writeText(text)
        .then(function () {
          alert("✅ Content copied!");
        })
        .catch(function () {
          alert("❌ Copy failed.");
        });

    } else {

      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert("✅ Content copied!");
    }

  });

}
