const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const output = document.getElementById("output");
const historyList = document.getElementById("historyList");
const usageCount = document.getElementById("usageCount");
const progressBar = document.getElementById("progressBar");

let history = [];
let usage = 0;

generateBtn.addEventListener("click", async () => {

    const prompt = document.getElementById("topic").value.trim();
    const type = document.getElementById("type").value;
    const tone = document.getElementById("tone").value;
    const length = document.getElementById("length").value;

    if (!prompt) {
        alert("Please enter a topic.");
        return;
    }

    output.innerHTML = "⏳ Generating...";

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    prompt,
    type,
    tone,
    length,
    language
})
        });
const language = document.getElementById("language").value;
        const data = await response.json();

        if (data.error) {
            output.innerHTML = "❌ " + data.error;
            return;
        }

        output.innerHTML = data.text;

        history.unshift(prompt);

        historyList.innerHTML = history
            .map(item => `<div>• ${item}</div>`)
            .join("");

        usage++;

        usageCount.innerHTML = `${usage} / 20`;

        progressBar.style.width = `${usage * 5}%`;

    } catch (err) {

        output.innerHTML = "❌ " + err.message;

    }

});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(output.innerText);

    alert("Copied!");

});

clearHistoryBtn.addEventListener("click", () => {

    history = [];

    historyList.innerHTML = "No history yet...";

});
