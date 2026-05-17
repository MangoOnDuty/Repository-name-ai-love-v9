import OpenAI from "openai";

export default async function handler(req, res) {

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "no text" });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com"
  });

  const prompt = `
你是一个恋爱分析AI（聊天军师）。

请输出：

1. 她的态度判断
2. 当前关系状态
3. 她的心理分析
4. 是否适合推进
5. 下一步聊天策略
6. 3条可以直接发送的回复（重要）

聊天内容：
${text}
`;

  const result = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  res.status(200).json({
    result: result.choices[0].message.content
  });
}
