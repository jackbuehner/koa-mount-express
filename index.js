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
function mountExpress(path, app) {
  /**
   * @param {import('koa').Context} ctx
   * @param {Function} next
   * @returns {void}
   */
  return (ctx, next) => {
    if (!ctx.url.startsWith(path) || !ctx.req.url) {
      return next();
    }

    // remove route prefix before passing to express app
    ctx.req.url = ctx.req.url.replace(path, "");

    // express app expects url to start with /
    if (ctx.req.url === "") {
      ctx.req.url = "/";
    }

    // forward request and response to express app
    app(ctx.req, ctx.res);
  };
}
