import { html, type MiniHtmlString } from "@spirobel/mininext";
import { router } from "./router";
let COUNT = 0;
function incrementCount() {
  COUNT++;
  const count = document.getElementById("count");
  if (count) count.innerText = String(COUNT);
}
export function counterRoute(): MiniHtmlString {
  const count = document.getElementById("count");
  if (count) count.innerText = String(COUNT);

  const increment = document.getElementById("increment");
  if (increment) {
    increment.onclick = incrementCount;
  }
  return html`<div>
    <h1>Frontend Counter demo</h1>
    <div id="count">0</div>

    <button id="increment">+1</button>

    <p>(Increments Count on click, no server interaction)</p>
    <a
      href="${router.link("/:exampleparam/:anotherExampleParam/", {
        exampleparam: "haha",
        anotherExampleParam: String(COUNT),
      })}"
      >Example Route: haha , ${String(COUNT)} aka the count value</a
    >
    <br />
  </div>`;
}
