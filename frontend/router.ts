import {
  createRouter,
  type Mini,
  type Params,
  html,
  type MiniHtmlString,
} from "@spirobel/mininext";
import { counterRoute } from "./counter-route";
export function exampleParamRoute(
  params: Params<"/:exampleparam/:anotherExampleParam/">,
): MiniHtmlString {
  return html`<div>
    <h1>Example route</h1>
    <p>Example param: ${params.exampleparam}</p>
    <p>Another example param: ${params.anotherExampleParam}</p>
    <a href="${router.link("/onboarding")}">Onboarding</a> <br />
    <a href="${router.link("/counter")}">Counter</a>
  </div>`;
}

const routes = {
  "/onboarding": ({}, mini: Mini): MiniHtmlString =>
    html`<div>
      <h1>Onboarding Example route</h1>
      <a
        href="${router.link("/:exampleparam/:anotherExampleParam/", {
          exampleparam: "haha",
          anotherExampleParam: "123",
        })}"
        >Example Route: haha , 123</a
      >
      <br />
      <a href="${router.link("/counter")}">Counter</a>
    </div>`,
  "/:exampleparam/:anotherExampleParam/": (
    params: Params<"/:exampleparam/:anotherExampleParam/">,
    mini: Mini,
  ) => exampleParamRoute(params),
  "/counter": () => counterRoute(),
} as const;
export const router = createRouter(routes);
router.navigate("/123/123");
