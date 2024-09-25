/**
 * Mounts an Express app on a Koa app.
 *
 * When a request comes to Koa app with a path that starts with the prefix,
 * it forwards the request to the Express app. The prefix is removed before
 * forwarding the request. The express app should handle sending a response.
 *
 * Note: This should be before any Koa middleware that sends a response.
 *
 * @example
 * const expressApp = express();
 * expressApp.get("/", (req, res) => {
 *  res.send("Hello Express");
 * }
 *
 * const app = new Koa();
 * app.use(mountExpress("/express", expressApp));
 * app.listen(3000);
 *
 * @param {string} path
 * @param {import('express').Express} app
 */
declare function mountExpress(path: string, app: import("express").Express): (ctx: import("koa").Context, next: Function) => void;
