# koa-mount-express

Mount Express applications within a Koa application as middleware. The `path` passed to `mountExpress()` is removed from the `ctx.req.url` before directing `ctx.req` and `ctx.res` to the Express app.
This is useful for mounting an external Express app within your own Koa app.

## Installation

```bash
npm install koa-mount-express
```

## Example

```js
import express from "express";
import Koa from "koa";
const app = new Koa();
const expressApp = express();

expressApp.get("/", function (req, res) {
  res.send("Hello Express");
});

expressApp.get("/route", function (req, res) {
  res.send("Hello Express toute");
});

// this will mount express app on /express route
// Note: this should be before other koa middleware
app.use(mountExpress("/express", expressApp));

app.use((ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(3000);
```

Example responses:

```
GET /
Hello Koa

GET /express
Hello Express

GET /route
Hello Express route

GET /express/not-a-route
Cannot GET /not-a-route
```
