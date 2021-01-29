"use strict";
// Version 1
// ビンゴの番号作成がクソ仕様になってしまったのでボツ
// const $doc = document;
// const $form = $doc.querySelector("form")! as HTMLFormElement;
// const $formNum = $form.querySelector("#js_form_number")! as HTMLInputElement;
// const $formSubmit = $form.querySelector(
//   "#js_form_submit"
// )! as HTMLButtonElement;
// const $playingBox = $doc.querySelector(".bl_playing")! as HTMLDivElement;
// const $cardParent = $doc.querySelector("#js_cardParent")! as HTMLDivElement;
// const $prevNumbers = $doc.querySelector(".bl_prevNumbers")! as HTMLDivElement;
// const $currNum = $doc.querySelector(".bl_currNumber")! as HTMLButtonElement;
// const $BingoBtn = $doc.querySelector(".bl_BingoBtn")! as HTMLButtonElement;
// class BingoGame {
//   private bingoNumbers: string[];
//   private cardNumbers: [number[], number[], number[], number[]];
//   private newNum: string;
//   private oldNum: string;
//   private playersNum: string;
//   private cardNum: number | null;
//   constructor() {
//     this.bingoNumbers = [];
//     this.cardNumbers = [[], [], [], []];
//     this.newNum = "";
//     this.oldNum = "";
//     this.playersNum = "";
//     this.cardNum = null;
//   }
//   // フォームの内容を取得
//   formJadge(inputEl: HTMLInputElement) {
//     this.playersNum = inputEl.value;
//     if (
//       this.playersNum === "2" ||
//       this.playersNum === "3" ||
//       this.playersNum === "4"
//     ) {
//       if (confirm(`${this.playersNum}人で開始しますか？`)) {
//         $form.style.display = "none";
//         $playingBox.style.display = "flex";
//         $cardParent.style.display = "flex";
//       }
//       return;
//     } else {
//       alert("半角数字の2, 3, 4から選んで入力してください。");
//     }
//   }
//   // ビンゴの番号を作成、表示
//   bingoNumCreate() {
//     // 重複してた場合は重複しなくなるまで繰り返し
//     if (this.rondomNumCreate(1, 99).bingoArrayCreate() === true) {
//       this.rendering();
//     } else {
//       while (this.rondomNumCreate(1, 99).bingoArrayCreate() !== true) {
//         this.rondomNumCreate(1, 99).bingoArrayCreate();
//         this.rendering();
//       }
//     }
//   }
//   // ビンゴカードの数字を作成
//   cardNumCreate(min: number, max: number) {
//     for (let i = 0; i < this.cardNumbers.length; i++) {
//       let btnIndex: number = 0;
//       while (btnIndex < 25) {
//         this.cardNum = Math.floor(Math.random() * (max + 1 - min)) + min;
//         // 重複を避ける
//         const cardResult: number = this.cardNumbers[i].indexOf(this.cardNum);
//         if (cardResult === -1) {
//           this.cardNumbers[i].push(this.cardNum);
//           btnIndex++;
//         } else {
//           this.cardNum = null;
//         }
//       }
//     }
//   }
//   appendCards() {
//     $cardParent.innerHTML = "";
//     for (
//       let arryIndex = 0;
//       arryIndex < parseFloat(this.playersNum);
//       arryIndex++
//     ) {
//       let cardHtml: string = `<div class="bl_card">`;
//       for (let i = 0; i < 25; i++) {
//         if (i === 12) {
//           cardHtml += `<button class="bl_card_btn bl_card_btn--center">free</button>`;
//         } else {
//           cardHtml += `<button class="bl_card_btn">${this.cardNumbers[arryIndex][i]}</button>`;
//         }
//       }
//       cardHtml += `</div>`;
//       $cardParent.innerHTML += cardHtml;
//     }
//   }
//   // ランダムな数字を作成
//   private rondomNumCreate(min: number, max: number) {
//     this.newNum = (
//       Math.floor(Math.random() * (max + 1 - min)) + min
//     ).toString();
//     this.oldNum = $prevNumbers.textContent!;
//     return this;
//   }
//   private bingoArrayCreate() {
//     // 重複を避ける
//     const result: number = this.bingoNumbers.indexOf(this.newNum);
//     if (result === -1) {
//       this.bingoNumbers.push(this.newNum);
//       return true;
//     }
//   }
//   // 画面を更新
//   private rendering() {
//     $prevNumbers.textContent = `${this.oldNum} ${this.newNum},`;
//     $currNum.textContent = this.newNum;
//   }
// }
// const bingogame = new BingoGame();
// $formSubmit.addEventListener("click", function (e) {
//   e.preventDefault();
//   bingogame.formJadge($formNum);
//   bingogame.cardNumCreate(1, 99);
//   bingogame.appendCards();
// });
// $BingoBtn.addEventListener("click", function () {
//   bingogame.bingoNumCreate();
// });
