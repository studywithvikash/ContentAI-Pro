export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://throbbing-mouse-eb03.nayakbhai5439.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      text: data.text
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
