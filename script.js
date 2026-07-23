const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const output = document.getElementById("output");
const historyList = document.getElementById("historyList");
const usageCount = document.getElementById("usageCount");
const progressBar = document.getElementById("progressBar");

let history = JSON.parse(localStorage.getItem("history")) || [];
let usage = Number(localStorage.getItem("usage")) || 0;
usageCount.innerHTML = `${usage} / 20`;
progressBar.style.width = `${usage * 5}%`;

historyList.innerHTML =
history.length > 0
? history.map(item => `<div>• ${item}</div>`).join("")
: "No history yet...";
generateBtn.addEventListener("click", async () => {

    const prompt = document.getElementById("topic").value.trim();
    const type = document.getElementById("type").value;
    const tone = document.getElementById("tone").value;
    const length = document.getElementById("length").value;
    const language = document.getElementById("language").value;
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
        const data = await response.json();

        if (data.error) {
            output.innerHTML = "❌ " + data.error;
            return;
        }

        output.innerHTML = data.text;

        history.unshift(prompt);
        localStorage.setItem("history", JSON.stringify(history));
        historyList.innerHTML = history
            .map(item => `<div>• ${item}</div>`)
            .join("");

        usage++;
        localStorage.setItem("usage", usage);
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
    localStorage.removeItem("history");
    historyList.innerHTML = "No history yet...";

});
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.innerHTML="☀️ Light Mode";
    }else{
        themeToggle.innerHTML="🌙 Dark Mode";
    }

});
downloadPdfBtn.addEventListener("click", () => {

    const content = output.innerText;

    if (!content || content === "Your AI generated content will appear here...") {
        alert("Generate content first.");
        return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <html>
        <head>
            <title>ContentAI Pro</title>
        </head>
        <body style="font-family:Arial;padding:30px;">
            <pre style="white-space:pre-wrap;">${content}</pre>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();

});
