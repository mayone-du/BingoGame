"use strict";
const $doc = document;
const $form = $doc.querySelector("form");
const $formNum = $form.querySelector("#js_form_number");
const $formSubmit = $form.querySelector("#js_form_submit");
const $playingBox = $doc.querySelector(".bl_playing");
const $cardParent = $doc.querySelector("#js_cardParent");
const $prevNumbers = $doc.querySelector(".bl_prevNumbers");
const $currNum = $doc.querySelector(".bl_currNumber");
const $BingoBtn = $doc.querySelector(".bl_bingoBtn");
class BingoGame {
    constructor() {
        this.cardNumbers = [[], [], [], []];
        this.playersNum = "";
        this.bingoNumbers = [];
        this.cardNum = null;
        this.bingoNumbersInit(1, 99);
        this.cardsEl = {};
    }
    // 1~99までの配列を作成し、シャッフルする処理
    bingoNumbersInit(min, max) {
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
    bingo(clickIndex) {
        $currNum.textContent = this.bingoNumbers[clickIndex].toString();
        $prevNumbers.textContent = ` ${$prevNumbers.textContent} ${this.bingoNumbers[clickCount].toString()},`;
    }
    // フォームの内容を取得
    formJadge(inputEl) {
        this.playersNum = inputEl.value;
        if (this.playersNum === "2" ||
            this.playersNum === "3" ||
            this.playersNum === "4") {
            if (confirm(`${this.playersNum}人で開始しますか？`)) {
                $form.style.display = "none";
                $playingBox.style.display = "flex";
                $cardParent.style.display = "flex";
            }
            return;
        }
        else {
            alert("半角数字の2, 3, 4から選んで入力してください。");
        }
    }
    // ビンゴカードの数字を作成
    cardNumCreate(min, max) {
        for (let i = 0; i < this.cardNumbers.length; i++) {
            let btnIndex = 0;
            while (btnIndex < 25) {
                this.cardNum = Math.floor(Math.random() * (max + 1 - min)) + min;
                // 重複を避ける
                const cardResult = this.cardNumbers[i].indexOf(this.cardNum);
                if (cardResult === -1) {
                    this.cardNumbers[i].push(this.cardNum);
                    btnIndex++;
                }
                else {
                    this.cardNum = null;
                }
            }
        }
    }
    // カードを作成、追加
    appendCards() {
        $cardParent.innerHTML = "";
        for (let arryIndex = 0; arryIndex < parseFloat(this.playersNum); arryIndex++) {
            let cardHtml = `<div class="bl_card">`;
            for (let i = 0; i < 25; i++) {
                if (i === 12) {
                    cardHtml += `<button class="bl_card_btn bl_card_btn--center">free</button>`;
                }
                else {
                    cardHtml += `<button class="bl_card_btn">${this.cardNumbers[arryIndex][i]}</button>`;
                }
            }
            cardHtml += `</div>`;
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
        const btn = bingogame.cardsEl[i];
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
    ;
    bingogame.bingo(clickCount);
    clickCount++;
});
