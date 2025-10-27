import catImageUrl from "./black-cat_1f408-200d-2b1b.png";
import "./style.css";

document.body.innerHTML = `
  <p>Care: <span id="counter">0</span></p>
  <p><span id="rate">0</span> care/sec</p>
  <button id="catbutton">
  <img src="${catImageUrl}" class="icon" />
  </button>
  <br>
  <p>
  <button id="handbutton">
  Extra Hand (<span id="handcost">10</span> Care)
  </button>&nbsp;
  amt: <span id="handamt">0</span>
  </p>
  <p>Need an embodied hand on petting this cat?</p>
  <br>
  <p>
  <button id="tlcbutton">
  TLC (<span id="tlccost">100</span> Care)
  </button>&nbsp;
  amt: <span id="tlcamt">0</span>
  </p>
  <p>It stands for Tender-Loving Care</p>
  <br>
  <p>
  <button id="mechbutton">
  Pet Machine (<span id="mechcost">1000</span> Care)
  </button>&nbsp;
  amt: <span id="mechamt">0</span>
  </p>
  <p>A cat-petting machine so your cat doesn't get lonely</p>
  <br>
  <p>
  <button id="massagebutton">
  Head Massager (<span id="massagecost">5000</span> Care)
  </button>&nbsp;
  amt: <span id="massageamt">0</span>
  </p>
  <p>Plant one on your cat's head like a parasite!</p>
  <br>
  <p>
  <button id="farmbutton">
  Hand Farm (<span id="farmcost">10000</span> Care)
  </button>&nbsp;
  amt: <span id="farmamt">0</span>
  </p>
  <p>Disembodied hands, fresh from the farm!</p>
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  button: HTMLButtonElement;
  amtelement: Element;
  costelement: Element;
}

// create general buttons
const catButton = document.getElementById("catbutton")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;

// create item buttons
const Items: Item[] = [
  {
    name: "Extra Hand",
    cost: 10,
    rate: 0.1,
    amount: 0,
    button: document.getElementById("handbutton")! as HTMLButtonElement,
    amtelement: document.getElementById("handamt")!,
    costelement: document.getElementById("handcost")!,
  },
  {
    name: "TLC",
    cost: 100,
    rate: 2,
    amount: 0,
    button: document.getElementById("tlcbutton")! as HTMLButtonElement,
    amtelement: document.getElementById("tlcamt")!,
    costelement: document.getElementById("tlccost")!,
  },
  {
    name: "Petting Machine",
    cost: 1000,
    rate: 50,
    amount: 0,
    button: document.getElementById("mechbutton")! as HTMLButtonElement,
    amtelement: document.getElementById("mechamt")!,
    costelement: document.getElementById("mechcost")!,
  },
  {
    name: "Head Massager",
    cost: 5000,
    rate: 100,
    amount: 0,
    button: document.getElementById("massagebutton")! as HTMLButtonElement,
    amtelement: document.getElementById("massageamt")!,
    costelement: document.getElementById("massagecost")!,
  },
  {
    name: "Hand Farm",
    cost: 10000,
    rate: 500,
    amount: 0,
    button: document.getElementById("farmbutton")! as HTMLButtonElement,
    amtelement: document.getElementById("farmamt")!,
    costelement: document.getElementById("farmcost")!,
  },
];

let counter: number = 0;
let growthRate: number = 0;
let startTime: number = 0;
let fps: number = 0;

function myCallback(
  timestamp: number = performance.timeOrigin + performance.now(),
) {
  if (!startTime) startTime = timestamp;

  // update time
  fps = (timestamp - startTime) / 1000;
  counter += fps * growthRate;
  startTime = timestamp;

  // update care and rate counters
  counterElement.textContent = Math.floor(counter).toString();
  rateElement.textContent = (Math.floor(growthRate * 10) / 10).toString();

  // update each button status
  Items.forEach((Item: Item) => {
    Item.amtelement.textContent = Math.floor(Item.amount).toString();
    Item.costelement.textContent = Math.floor(Item.cost).toString();
    Item.button.disabled = counter < Math.floor(Item.cost);
  });

  requestAnimationFrame(myCallback);
}
requestAnimationFrame(myCallback);

// clicking on cat button
catButton.addEventListener("click", () => {
  counter++;
});

// clicking on item buttons
Items.forEach((Item: Item) => {
  Item.button.addEventListener("click", () => {
    growthRate += Item.rate;
    counter -= Item.cost;
    Item.amount++;
    Item.cost *= 1.15;
  });
});
