const Koa = require('koa');
const { serveStaticPlugin} = require('./plugins/serveStaticPlugin')
const { moduleRewritePlugin } = require('./plugins/moduleRewritePlugin')
function createServer() {
  const app = new Koa();
  const root = process.cwd();
  // 构建上下文对象
  const context = {
    app,
    root
  }
  app.use((ctx, next) => {
    // 扩展ctx属性
    Object.assign(ctx, context);
    return next();
  });
  const resolvedPlugins = [
    moduleRewritePlugin,
    serveStaticPlugin
  ];
  // 依次注册所有插件
  resolvedPlugins.forEach(plugin => plugin(context));
  return app;
}
createServer().listen(4000, () => {
  console.log('4000 端口已经启动')
});