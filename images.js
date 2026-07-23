const generateBtn = document.getElementById("generateImageBtn");
const imageResult = document.getElementById("imageResult");

generateBtn.addEventListener("click", async () => {

    const prompt = document.getElementById("imagePrompt").value.trim();

    if (!prompt) {
        alert("Please enter an image prompt.");
        return;
    }

    imageResult.innerHTML = "<p>🎨 Generating Image...</p>";

    try {

        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        const data = await response.json();

        if (data.error) {
            imageResult.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        imageResult.innerHTML = `
            <img
                src="${data.image}"
                style="width:100%;border-radius:16px;">
        `;

    } catch (err) {

        imageResult.innerHTML = `<p>${err.message}</p>`;

    }

});
