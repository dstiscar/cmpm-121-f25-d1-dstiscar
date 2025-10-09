import catImageUrl from "./black-cat_1f408-200d-2b1b.png";
import "./style.css";

document.body.innerHTML = `
  <p>Care: <span id="counter">0</span></p>
  <button id="catbutton">
  <img src="${catImageUrl}" class="icon" />
  </button>
  <button id="tlcbutton">
  TLC (10 Care)
  </button>
`;

const catButton = document.getElementById("catbutton")! as HTMLButtonElement;
const tlcButton = document.getElementById("tlcbutton")! as HTMLButtonElement;
tlcButton.disabled = true;
const counterElement = document.getElementById("counter")!;

let startTime: number = 0;
let interval: number = 1000;
let growthRate: number = 0;
const tlcCost = 10;

let counter: number = 0;

function myCallback(timestamp: number) {
  if (!startTime) startTime = timestamp;

  interval = 1000 / growthRate;
  if (growthRate > 0) {
    if (timestamp - startTime >= interval) {
      counter += 1;
      counterElement.textContent = counter.toString();
      tlcButton.disabled = counter < tlcCost;
      startTime = timestamp;
    }
  }
  requestAnimationFrame(myCallback);
}

requestAnimationFrame(myCallback);

catButton.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  tlcButton.disabled = counter < tlcCost;
});

tlcButton.addEventListener("click", () => {
  counter -= tlcCost;
  growthRate += 1;
  counterElement.textContent = counter.toString();
  tlcButton.disabled = true;
  startTime = 0;
});


