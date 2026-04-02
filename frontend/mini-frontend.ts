import { html, renderRoot } from "@spirobel/mininext";
import { router } from "./router";
const container = document.getElementById("container");
if (!container) throw new Error("Could not find container element");
renderRoot({
  component: () => html`<div style="height: 100%">${router.component}</div>`,
  container,
});
