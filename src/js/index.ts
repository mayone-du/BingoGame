const $doc = document;
const $form = $doc.querySelector("form")! as HTMLFormElement;
const $formNum = $form.querySelector("#js_form_number")! as HTMLInputElement;
const $formSubmit = $form.querySelector(
  "#js_form_submit"
)! as HTMLButtonElement;
const $playingBox = $doc.querySelector(".bl_playing")! as HTMLDivElement;
const $cardParent = $doc.querySelector("#js_cardParent")! as HTMLDivElement;
const $prevNumbers = $doc.querySelector(".bl_prevNumbers")! as HTMLDivElement;
const $currNum = $doc.querySelector(".bl_currNumber")! as HTMLButtonElement;
const $BingoBtn = $doc.querySelector(".bl_bingoBtn")! as HTMLButtonElement;

class BingoGame {
  cardNumbers: [number[], number[], number[], number[]];
  bingoNumbers: number[];
  private playersNum: string;
  private cardNum: number | null;
  cardsEl: any;

  constructor() {
    this.cardNumbers = [[], [], [], []];
    this.playersNum = "";
    this.bingoNumbers = [];
    this.cardNum = null;
    this.bingoNumbersInit(1, 99);
    this.cardsEl = {};
  }

  // 1~99までの配列を作成し、シャッフルする処理
  private bingoNumbersInit(min: number, max: number) {
    for (let i = 1; this.bingoNumbers.length < 99; i++) {
      this.bingoNumbers.push(i);
    }
    let bingoLength = this.bingoNumbers.length;
    while (bingoLength) {
      const ranNum = Math.floor(Math.random() * bingoLength);
      const lastVal = this.bingoNumbers[--bingoLength];
      this.bingoNumbers[bingoLength] = this.bingoNumbers[ranNum];
      this.bingoNumbers[ranNum] = lastVal;
    }
  }

  // シャッフルされた配列を、クリックされた数目のところからとりだす
  bingo(clickIndex: number) {
    $currNum.textContent = this.bingoNumbers[clickIndex].toString();
    $prevNumbers.textContent = ` ${
      $prevNumbers.textContent
    } ${this.bingoNumbers[clickCount].toString()},`;
  }

  // フォームの内容を取得
  formJadge(inputEl: HTMLInputElement) {
    this.playersNum = inputEl.value;
    if (
      this.playersNum === "2" ||
      this.playersNum === "3" ||
      this.playersNum === "4"
    ) {
      if (confirm(`${this.playersNum}人で開始しますか？`)) {
        $form.style.display = "none";
        $playingBox.style.display = "flex";
        $cardParent.style.display = "flex";
      }
      return;
    } else {
      alert("半角数字の2, 3, 4から選んで入力してください。");
    }
  }

  // ビンゴカードの数字を作成
  cardNumCreate(min: number, max: number) {
    for (let i = 0; i < this.cardNumbers.length; i++) {
      let btnIndex: number = 0;
      while (btnIndex < 25) {
        this.cardNum = Math.floor(Math.random() * (max + 1 - min)) + min;
        // 重複を避ける
        const cardResult: number = this.cardNumbers[i].indexOf(this.cardNum);
        if (cardResult === -1) {
          this.cardNumbers[i].push(this.cardNum);
          btnIndex++;
        } else {
          this.cardNum = null;
        }
      }
    }
  }

  // カードを作成、追加
  appendCards() {
    $cardParent.innerHTML = "";
    
    let playerIndex = 1;
    for (
      let arryIndex = 0;
      arryIndex < parseFloat(this.playersNum);
      arryIndex++
    ) {
      let cardHtml: string = `<div class="bl_nameCard"><input class="bl_nameInput" type="text" placeholder="player ${playerIndex++}"><div class="bl_card">`;
      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          cardHtml += `<button class="bl_card_btn bl_card_btn--center">free</button>`;
        } else {
          cardHtml += `<button class="bl_card_btn">${this.cardNumbers[arryIndex][i]}</button>`;
        }
      }
      cardHtml += `</div></div>`;

      $cardParent.innerHTML += cardHtml;
    }

    this.cardsEl = $doc.querySelectorAll(".bl_card_btn");
  }
}

const bingogame = new BingoGame();
let clickCount = 0;

$formSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  bingogame.formJadge($formNum);
  bingogame.cardNumCreate(1, 99);
  bingogame.appendCards();

  for (let i = 0; i < bingogame.cardsEl.length; i++) {
    const btn: HTMLElement = bingogame.cardsEl[i];
    btn.addEventListener("click", () => {
      btn.classList.toggle("bl_card_btn--active");
    });
  }
});

$BingoBtn.addEventListener("click", function () {
  if (clickCount === bingogame.bingoNumbers.length) {
    alert("引き終わりました。");
    return;
  }
  bingogame.bingo(clickCount);

  clickCount++;
});
