import catImageUrl from "./black-cat_1f408-200d-2b1b.png";
import "./style.css";

document.body.innerHTML = `
  <p>Care: <span id="counter">0</span></p>
  <p><span id="rate">0</span> care/sec</p>
  <button id="catbutton">
  <img src="${catImageUrl}" class="icon" />
  </button>
  <p>
  <button id="handbutton">
  Extra Hand (<span id="handcost">10</span> Care)
  </button>&nbsp;
  amt: <span id="handamt">0</span>
  </p>
  <p>
  <button id="tlcbutton">
  TLC (<span id="tlccost">100</span> Care)
  </button>&nbsp;
  amt: <span id="tlcamt">0</span>
  </p>
  <p>
  <button id="mechbutton">
  Pet Machine (<span id="mechcost">1000</span> Care)
  </button>&nbsp;
  amt: <span id="mechamt">0</span>
  </p>
`;

const catButton = document.getElementById("catbutton")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;

const handButton = document.getElementById("handbutton")! as HTMLButtonElement;
const tlcButton = document.getElementById("tlcbutton")! as HTMLButtonElement;
const mechButton = document.getElementById("mechbutton")! as HTMLButtonElement;

const handamtElement = document.getElementById("handamt")!;
const tlcamtElement = document.getElementById("tlcamt")!;
const mechamtElement = document.getElementById("mechamt")!;

const handcostElement = document.getElementById("handcost")!;
const tlccostElement = document.getElementById("tlccost")!;
const mechcostElement = document.getElementById("mechcost")!;

let handCost: number = 10;
let tlcCost: number = 100;
let mechCost: number = 1000;

let handAmt: number = 0;
let tlcAmt: number = 0;
let mechAmt: number = 0;

let startTime: number = 0;
let fps: number = 0;
let growthRate: number = 0;

let counter: number = 0;

function myCallback(
  timestamp: number = performance.timeOrigin + performance.now(),
) {
  if (!startTime) startTime = timestamp;

  fps = (timestamp - startTime) / 1000;
  counter += fps * growthRate;
  startTime = timestamp;

  counterElement.textContent = Math.floor(counter).toString();
  rateElement.textContent = (Math.floor(growthRate*10)/10).toString();

  handamtElement.textContent = Math.floor(handAmt).toString();
  tlcamtElement.textContent = Math.floor(tlcAmt).toString();
  mechamtElement.textContent = Math.floor(mechAmt).toString();

  handcostElement.textContent = Math.floor(handCost).toString();
  tlccostElement.textContent = Math.floor(tlcCost).toString();
  mechcostElement.textContent = Math.floor(mechCost).toString();

  handButton.disabled = counter < Math.floor(handCost);
  tlcButton.disabled = counter < Math.floor(tlcCost);
  mechButton.disabled = counter < Math.floor(mechCost);

  requestAnimationFrame(myCallback);
}

requestAnimationFrame(myCallback);

catButton.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  handButton.disabled = counter < handCost;
});

handButton.addEventListener("click", () => {
  growthRate += 0.1;

  counter -= handCost;
  handAmt += 1;
  handCost *= 1.15;
});

tlcButton.addEventListener("click", () => {
  growthRate += 2;

  counter -= tlcCost;
  tlcAmt += 1;
  tlcCost *= 1.15;
});

mechButton.addEventListener("click", () => {
  growthRate += 50;

  counter -= mechCost;
  mechAmt += 1;
  mechCost *= 1.15;
});
