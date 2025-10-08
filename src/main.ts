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

let counter: number = 0;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
});