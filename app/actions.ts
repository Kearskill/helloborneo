"use server"

export async function processAiQuery(query: string) {
  const apiKey = process.env.QWEN_API_KEY;

  // LOGGING (Check your server terminal/command prompt)
  console.log("--- AI Query Debug ---");
  console.log("Key defined:", !!apiKey);
  if (apiKey) {
    console.log("Key starts with:", apiKey.substring(0, 6));
    console.log("Key length:", apiKey.length);
  }

  if (!apiKey) {
    return { error: "QWEN_API_KEY is not configured in .env.local" };
  }

  // Determine the correct endpoint
  // Standard (Beijing): https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
  // International (Singapore): https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions
  // US (Virginia): https://dashscope-us.aliyuncs.com/compatible-mode/v1/chat/completions

  // TRYING INTERNATIONAL BY DEFAULT AS A FALLBACK
  const endpoint = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`, // Trim to remove any hidden spaces
      },
      body: JSON.stringify({
        model: "qwen-plus",
        messages: [
          {
            role: "system",
            content: "You are TnG Suara, a helpful and concise voice assistant for the Touch 'n Go eWallet app. Assist the user with their queries about payments, transfers, and app features. Keep responses brief and conversational."
          },
          { role: "user", content: query },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Qwen API Error Response:", JSON.stringify(errorData, null, 2));
      return {
        error: errorData.error?.message || `API Error: ${response.status}`,
        code: errorData.error?.code
      };
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  } catch (error) {
    console.error("AI Processing Network Error:", error);
    return { error: "Failed to connect to AI service. Check your internet or endpoint URL." };
  }
}

