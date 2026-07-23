const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearChatBtn = document.getElementById("clearChatBtn");

let chats = JSON.parse(localStorage.getItem("chatHistory")) || [];

function renderChats() {
    if (chats.length === 0) {
        chatBox.innerHTML = "Welcome! Ask me anything.";
        return;
    }

    chatBox.innerHTML = chats.map(chat => `
        <div style="margin-bottom:15px;">
            <b>🧑 You:</b><br>${chat.user}<br><br>
            <b>🤖 AI:</b><br>${chat.ai}
        </div>
        <hr>
    `).join("");

    chatBox.scrollTop = chatBox.scrollHeight;
}

renderChats();

sendBtn.addEventListener("click", async () => {

    const prompt = chatInput.value.trim();

    if (!prompt) return;

    chatInput.value = "";

    chatBox.innerHTML += `
        <div>
            <b>🧑 You:</b><br>${prompt}<br><br>
            <b>🤖 AI:</b><br>⏳ Thinking...
        </div><hr>
    `;

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt,
                type: "AI Chat",
                tone: "Friendly",
                length: "Medium",
                language: "English"
            })
        });

        const data = await response.json();

        chats.push({
            user: prompt,
            ai: data.text
        });

        localStorage.setItem("chatHistory", JSON.stringify(chats));

        renderChats();

    } catch (err) {

        alert(err.message);

    }

});

clearChatBtn.addEventListener("click", () => {

    chats = [];

    localStorage.removeItem("chatHistory");

    renderChats();

});
