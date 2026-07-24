export default async function handler(req, res) {

    // Allow POST only
    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method Not Allowed"
        });

    }

    try {

        const {

            prompt,
            type,
            tone,
            length,
            language

        } = req.body;

        if (!prompt || prompt.trim() === "") {

            return res.status(400).json({
                error: "Prompt is required"
            });

        }

        const finalPrompt = `
You are ContentAI Pro.

Task:
${type || "General"}

Language:
${language || "English"}

Tone:
${tone || "Professional"}

Length:
${length || "Medium"}

User Request:
${prompt}

Rules:
- Return only the final answer.
- Do not use markdown.
- Do not explain your process.
- If code is requested, return only code.
`;

        const workerResponse = await fetch(

            "https://throbbing-mouse-eb03.nayakbhai5439.workers.dev",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    prompt: finalPrompt

                })

            }

        );
              if (!workerResponse.ok) {

            return res.status(workerResponse.status).json({

                error: `Worker Error (${workerResponse.status})`

            });

        }

        const data = await workerResponse.json();

        console.log("Worker Response:", data);

        const text =
            data.text ||
            data.response ||
            data.result ||
            data.output ||
            data.answer ||
            data.message ||
            "";

        if (!text) {

            return res.status(500).json({

                error: "Worker returned an empty response.",

                debug: data

            });

        }

        return res.status(200).json({

            success: true,

            text: text

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            error: err.message

        });

    }

}
