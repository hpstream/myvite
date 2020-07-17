const path = require('path');
function serveStaticPlugin({ app, root }) {
  // 以当前根目录作为静态目录
  app.use(require('koa-static')(root));
  // 以public目录作为根目录
  console.log(root)
  app.use(require('koa-static')(path.join(root, 'public')))
}
exports.serveStaticPlugin = serveStaticPlugin;