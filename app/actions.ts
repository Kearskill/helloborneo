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

  const proceduralMemoryYaml = `
procedural_memory:
  contexts:
    - id: malay
      description: Standard Malay language (Bahasa Melayu)
    - id: english
      description: Standard English language
    - id: iban
      description: Iban language, predominantly spoken in Sarawak
    - id: kadazan
      description: Kadazan language, predominantly spoken in Sabah
  intent_types:
    - transaction: Transferring money, paying bills, scanning QR
    - summary: Checking balance, viewing history, spending analytics
    - others: Greetings, general questions, or chat
`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: "qwen-plus",
        messages: [
          { 
            role: "system", 
            content: `You are a linguistic and intent analyzer for the Touch 'n Go eWallet app.
            
Use the following Procedural Memory (YAML) to classify the user's input:
${proceduralMemoryYaml}

Your goal is to identify:
1. The 'id' (context) from the procedural memory that matches the language/dialect.
2. The 'type' (intent) of the request.

Respond ONLY with a valid JSON object:
{
  "id": "malay" | "english" | "iban" | "kadazan",
  "type": "transaction" | "summary" | "others",
  "recipient": "string | null", 
  "amount": "number | string | null",
  "reasoning": "short explanation of why you chose this id and type"
}

Notes:
- For 'transaction' type, try to extract 'recipient' (name or phone number) and 'amount'.
- If 'amount' or 'recipient' are not mentioned, set them to null.
- For non-transaction types, 'recipient' and 'amount' should be null.` 
          },
          { role: "user", content: query },
        ],
        response_format: { type: "json_object" }
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
    try {
      const parsedContent = JSON.parse(data.choices[0].message.content);
      return { data: parsedContent };
    } catch (parseError) {
      console.error("JSON Parse Error:", data.choices[0].message.content);
      return { text: data.choices[0].message.content }; // Fallback to raw text
    }
  } catch (error) {
    console.error("AI Processing Network Error:", error);
    return { error: "Failed to connect to AI service. Check your internet or endpoint URL." };
  }
}

