# animal_quiz

animal_quiz は、AI が動物当てクイズを出すアプリケーションです。<br>
動作に ChatGPT の API キー を必要とします。

# 導入

```
npm i animal_quiz
```

インストール後、`node_modules/animal_quiz/`に`.env`を作成してください。<br>
`.env`に OPENAI_API_KEY を設定します。<br>
以下のように書くことで設定できます。(xxx 部分には API キーを入力してください)<br>

```
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

# 遊び方

次のコマンドを実行すると、アプリが起動します。

```
npx animal_quiz
```

# クイズのルール

クイズの答えとして、動物がランダムに決定されます。<br>
動物に関する質問をして、その動物を当てることができればプレイヤーの勝ちです。<br>
質問は YES か NO で答えられるもののみです。<br>
質問と解答は合計 10 回までです。<br>
質問の結果、答えの動物がわかったらメニューから【答える】を選択して、解答を入力してください。<br>
解答が間違えていてもクイズは続行します。

# 質問の例

- その動物は肉食動物ですか？
- その動物は人間より大きいですか？
- その動物は卵を産みますか？

# ヒント

解答には漢字、カタカナ、ひらがなを使えます。答えが犬の場合、犬、イヌ、いぬのどれでも正解となります。<br>
答えの動物は地上の動物とは限りません。海の生き物や空を飛ぶ動物を含みます。

# 注意事項

質問への回答には ChatGPT を使用しています。<br>
AI の特性上、正しくない回答をすることがありますがご容赦ください。

# どうしても勝てない！

ここをクリックすると答えに使われる動物のリストが見れます。<br>
難易度が下がってしまうので注意してください。

<details>
<summary>動物一覧を見る</summary>
犬
熊
人間
猿
羊
山羊
鶏
烏
雀
鮫
海豚
鯨
アルパカ
馬
駱駝
虎
ライオン
猫
ティラノサウルス
象
キリン
トカゲ
ヘビ
ハムスター
リス
ネズミ
</details>
