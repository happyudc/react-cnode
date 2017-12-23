const express = require('express');
const ReactSSR = require('react-dom/server'); // 服务器上渲染组件
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default;
  // 读取打包后的index.html
  const template = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf-8");
  // 指定静态资源文件路径
  app.use("/public", express.static(path.join(__dirname, "../dist")));
  // 拦截所有请求(除静态资源:/public/)
  app.get("*", function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace("<!-- app -->", appString))
  });
} else {
  const devStatic = require('./util/dev-static');
  devStatic(app)
}


app.listen(3333, function () {
  console.log("server is running at port 3333")
});



