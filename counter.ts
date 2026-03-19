import { html } from "@spirobel/mininext";

// ── static skeleton html ────────────────────────────────────────────────
const skeleton = await html`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Counter</title>
      <style>
        body {
          font-family: sans-serif;
          text-align: center;
          padding: 50px;
        }
        h1 {
          font-size: 4rem;
        }
        button {
          font-size: 1.5rem;
          padding: 15px 30px;
        }
      </style>
    </head>
    <body>
      <h1>Counter demo</h1>
      <div id="count">${null}</div>

      <form method="POST" action="/">
        <button type="submit">+1</button>
      </form>

      <p>(form submit full page reload, zero JS on frontend)</p>
    </body>
  </html>`.build();

let globalCounter = 0;

// ── request handler ─────────────────────────────────────────────────────
function fetch(req: Request) {
  // increment only on POST (form submit)
  if (req.method === "POST") {
    globalCounter++;
    return Response.redirect("/", 303);
  }

  return new Response(
    skeleton.fill(html`<div id="count">${globalCounter}</div>`),
  );
}

// ── server ──────────────────────────────────────────────────────────────
const server = Bun.serve({
  routes: skeleton.static_routes,
  fetch,
});

// hmr support
globalThis.minireload = () => {
  server.reload({
    routes: skeleton.static_routes,
    fetch,
  });
};

console.log("Counter server running at http://localhost:3000");
