import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com"
});

export default async function handler(req, res) {

  const { text } = req.body;

  const prompt = `
你是恋爱军师AI。

请分析以下聊天内容，并给出：
1. 她的态度
2. 心理状态
3. 下一步怎么聊
4. 3条可发送回复

聊天内容：
${text}
`;

  const completion = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  res.json({
    result: completion.choices[0].message.content
  });
}