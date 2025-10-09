import catImageUrl from "./black-cat_1f408-200d-2b1b.png";
import "./style.css";

document.body.innerHTML = `
  <p>Care: <span id="counter">0</span></p>
  <button id="catbutton">
  <img src="${catImageUrl}" class="icon" />
  </button>
`;

const button = document.getElementById("catbutton")!;
const counterElement = document.getElementById("counter")!;

let startTime: number = 0;
const interval = 1000;

let counter: number = 0;

function myCallback(timestamp: number) {
  if (!startTime) startTime = timestamp;
  if (timestamp - startTime >= interval) {
    counter += 1;
    counterElement.textContent = counter.toString();
    startTime = timestamp;
  }
  requestAnimationFrame(myCallback);
}

requestAnimationFrame(myCallback);

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
});
