import enquirer from "enquirer";
import { config } from "dotenv";
config();
class Answer {
  constructor() {
    this.animal = this.animalSelect();
  }

  async input() {
    const response = await enquirer.prompt({
      type: "input",
      name: "input",
      message: "答え:",
    });

    return response.input;
  }

  check(response) {
    for (let variation of this.animal) {
      if (response.match(variation)) {
        console.log(`正解！答えは${this.animal[0]}でした！`);
        console.log("Congratulations!\nゲームを終了します");
        return true;
      }
    }
    console.log("不正解！");
    return false;
  }

  animalSelect() {
    const animals = [
      ["犬", "いぬ", "イヌ"],
      ["熊", "くま", "クマ"],
      ["人間", "にんげん", "ニンゲン", "人", "ひと", "ヒト"],
      ["猿", "さる", "サル"],
      ["羊", "ひつじ", "ヒツジ"],
      ["山羊", "やぎ", "ヤギ"],
      ["鶏", "にわとり", "にわとり"],
      ["烏", "カラス", "からす"],
      ["雀", "スズメ", "すずめ"],
      ["鮫", "サメ", "さめ"],
      ["海豚", "いるか", "イルカ"],
      ["鯨", "クジラ", "くじら"],
      ["アルパカ", "あるぱか"],
      ["馬", "ウマ", "うま"],
      ["駱駝", "ラクダ", "らくだ"],
      ["虎", "トラ", "とら"],
      ["ライオン", "らいおん"],
      ["猫", "ネコ", "ねこ"],
      ["ティラノサウルス", "てぃらのさうるす"],
      ["象", "ゾウ", "ぞう"],
      ["キリン", "麒麟", "きりん"],
      ["蜥蜴", "トカゲ", "とかげ"],
      ["蛇", "ヘビ", "へび"],
      ["ハムスター", "はむすたー"],
      ["栗鼠", "リス", "りす"],
      ["鼠", "ネズミ", "ねずみ"],
    ];
    return animals[Math.floor(Math.random() * animals.length)];
  }
}

export default Answer;
