import dotenv from "dotenv";
import path from "path";
import axios from "axios";
import enquirer from "enquirer";
import { fileURLToPath } from "url";

// .envから環境変数を取り込み
const filename = fileURLToPath(import.meta.url);
dotenv.config({
  path: path.resolve(path.dirname(filename), "../.env"),
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
class Message {
  constructor(animal) {
    this.messages = this.firstMessage(animal);
  }

  systemPrompt(animal) {
    return `動物当てクイズをします。
ChatGPTはクイズの出題者です。
解答者の質問に対して返答するのがあなたの任務です。
* クイズの答えは${animal}ですが、これは秘密です。会話の中で${animal}を使うのは禁止です。
* これから${animal}に関する質問がきますので、ChatGPTは必ず'YES','NO','わかりません','どちらともいえない','答えられません'のいずれかで答えてください。
それ以外の言葉を使ってはいけません。`;
  }

  firstMessage(animal) {
    return [
      {
        role: "system",
        content: this.systemPrompt(animal),
      },
    ];
  }

  async addMessage(count) {
    const response = await enquirer.prompt({
      type: "input",
      name: "input",
      message: count + "回目の質問:",
    });
    this.messages.push({ role: "user", content: response.input });
  }

  async sendCompletion() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      messages: this.messages,
    };
    const res = await (async () => {
      const url = "https://api.openai.com/v1/chat/completions";
      try {
        const {
          data: { choices },
        } = await axios.post(url, data, { headers });
        return choices[0].message.content;
      } catch (error) {
        console.error(error);
      }
    })();
    console.log(res);
    this.messages.push({ role: "assistant", content: res });
  }
}

export default Message;
