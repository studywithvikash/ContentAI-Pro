export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method Not Allowed"
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    try {

      const { prompt } = await request.json();

      if (!prompt) {
        return Response.json({
          error: "Prompt is required"
        }, { status: 400 });
      }

      const result = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct",
        {
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        }
      );
            return new Response(
        JSON.stringify({
          success: true,
          text:
            result.response ||
            result.result ||
            result.output ||
            "No response generated."
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch (err) {

      return new Response(
        JSON.stringify({
          error: err.message
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    }

  }
};
