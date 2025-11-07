import catImageUrl from "./black-cat_1f408-200d-2b1b.png";
import "./style.css";

document.body.innerHTML = `
  <p>Care: <span id="counter">0</span></p>
  <p><span id="rate">0</span> care/sec</p>
  <button id="catbutton">
  <img src="${catImageUrl}" class="icon" />
  </button>
`;

let counter: number = 0;
let prevCounter: number = 0;
let growthRate: number = 0;
let startTime: number = 0;
let fps: number = 0;

// cat button
const catButton = document.getElementById("catbutton")! as HTMLButtonElement;
catButton.addEventListener("click", () => {
  counter++;
  // animate normal click
  catButton.classList.add("buttonanimate-heavy");
  catButton.addEventListener("animationend", () => {
    catButton.classList.remove("buttonanimate-heavy");
  }, { once: true });
});

// create care and rate counters
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;

// create item data
interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  button: HTMLButtonElement;
  desc: string;
}
const Items: Item[] = [
  {
    name: "Extra Hand",
    cost: 10,
    rate: 0.1,
    amount: 0,
    button: document.createElement("button"),
    desc: "Need an embodied hand on petting this cat?",
  },
  {
    name: "TLC",
    cost: 100,
    rate: 2,
    amount: 0,
    button: document.createElement("button"),
    desc: 'It stands for "Tender-Loving Care"',
  },
  {
    name: "Petting Machine",
    cost: 1000,
    rate: 50,
    amount: 0,
    button: document.createElement("button"),
    desc: "A cat-petting machine so your cat doesn't get lonely",
  },
  {
    name: "Head Massager",
    cost: 5000,
    rate: 100,
    amount: 0,
    button: document.createElement("button"),
    desc: "Plant one on your cat's head like a parasite!",
  },
  {
    name: "Hand Farm",
    cost: 10000,
    rate: 500,
    amount: 0,
    button: document.createElement("button"),
    desc: "Disembodied hands, fresh from the farm!",
  },
];

// create item buttons
Items.forEach((Item: Item) => {
  // item button
  document.body.append(document.createElement("br"));
  document.body.append(document.createElement("br"));
  Item.button.innerHTML = Item.name + " (" + Item.cost.toString() + " Care)";
  document.body.append(Item.button);

  // amount counter
  document.body.append(" Amount: ");
  const amt = document.createElement("string");
  amt.innerHTML = Item.amount.toString();
  document.body.append(amt);

  // item description
  document.body.append(document.createElement("br"));
  document.body.append(Item.desc);

  // when item button is clicked
  Item.button.addEventListener("click", () => {
    growthRate += Item.rate;
    counter -= Item.cost;
    Item.amount++;
    Item.cost = Math.round(Item.cost * 1.15);

    // update cost and amount counters
    Item.button.innerHTML = Item.name + " (" + Item.cost.toString() + " Care)";
    amt.innerHTML = Item.amount.toString();

    // update background gradient
    document.body.style.background =
      "linear-gradient(0deg, #61008aff 0%, #1a0079ff " +
      (growthRate * 3).toString() + "%)";
  });
});

// update every frame
function myCallback(
  timestamp: number = performance.timeOrigin + performance.now(),
) {
  if (!startTime) startTime = timestamp;

  // update time
  prevCounter = +counterElement.textContent;
  fps = (timestamp - startTime) / 1000;
  counter += fps * growthRate;
  startTime = timestamp;

  // update care and rate counters
  counterElement.textContent = Math.round(counter).toString();
  rateElement.textContent = (Math.round(growthRate * 10) / 10).toString();

  // animate automatic click
  if (
    +counterElement.textContent > prevCounter &&
    !catButton.classList.contains("buttonanimate-heavy")
  ) {
    catButton.classList.add("buttonanimate-light");
    catButton.addEventListener("animationend", () => {
      catButton.classList.remove("buttonanimate-light");
    }, { once: true });
  }

  // update status for each item button
  Items.forEach((Item: Item) => {
    Item.button.disabled = counter < Math.round(Item.cost);
  });

  requestAnimationFrame(myCallback);
}
requestAnimationFrame(myCallback);
