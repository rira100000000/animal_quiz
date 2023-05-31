#!/usr/bin/env node

import dotenv from "dotenv";
import path from "path";
import Answer from "../lib/answer.js";
import Message from "../lib/message.js";
import enquirer from "enquirer";
import { fileURLToPath } from "url";

// .envから環境変数を取り込み
const filename = fileURLToPath(import.meta.url);
dotenv.config({
  path: path.resolve(path.dirname(filename), "../.env"),
});

if (process.env.OPENAI_API_KEY === "") {
  console.log(
    "API Keyが設定されていません。\n.envファイルに'OPENAI_API_KEY'を設定してください。"
  );
} else {
  console.log("APIキー確認完了");
  quiz();
}

// send a message and wait for the response
async function quiz() {
  console.log(
    "動物当てクイズを始めます。私がランダムに動物を選びますので、質問を繰り返してその動物を当ててください。\n質問と解答は合計10回まで、YES,NOで答えられる物のみです。\n"
  );

  const answer = new Answer();
  const message = new Message(answer.animal[0]);
  console.log("準備ができました！質問をどうぞ！");

  await message.addMessage(1);
  await message.sendCompletion();

  let response;
  for (let count = 2; count <= 10; count++) {
    if (count === 10) {
      console.log("10回目です。答えをどうぞ");
      response = await answer.input();
      if (answer.check(response)) {
        message.correctAnswerMessage(answer.animal[0]);
        return;
      }
      console.log(
        `残念！時間切れ！\n答えは${answer.animal[0]}でした\nゲームを終了します`
      );
    } else {
      response = await enquirer.prompt({
        type: "select",
        name: "selected",
        choices: ["質問", "答える"],
        message: count + "質問しますか？解答しますか？:",
      });
      if (response.selected === "質問") {
        await message.addMessage(count);
        await message.sendCompletion();
      } else {
        response = await answer.input();
        if (answer.check(response)) {
          message.correctAnswerMessage(answer.animal[0]);
          return;
        } else {
          console.log("不正解！");
        }
      }
    }
  }
  return;
}
