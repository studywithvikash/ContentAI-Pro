export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const { prompt } = req.body;

    const response = await fetch(
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt)
    );

    return res.status(200).json({
      image: response.url
    });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
