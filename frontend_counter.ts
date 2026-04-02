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
      <script type="module" src="/frontend/mini-frontend.js"></script>
      <div id="container"></div>
    </body>
  </html>`.build();

// ── request handler ─────────────────────────────────────────────────────
function fetch(req: Request) {
  return new Response(skeleton.fill());
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
