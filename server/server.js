const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ReactSSR = require('react-dom/server'); // 服务器上渲染组件
const favicon = require('serve-favicon');
const fs = require('fs');
const path = require('path');

const serverRender = require('./util/server-render')

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}));

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/api/user', require('./util/handle-login'));
app.use('/api', require('./util/proxy'));

if (!isDev) {
  const serverEntry = require('../dist/server-entry');
  // 读取打包后的index.html
  const template = fs.readFileSync(path.join(__dirname, "../dist/server.ejs"), "utf-8");
  // 指定静态资源文件路径
  app.use("/public", express.static(path.join(__dirname, "../dist")));
  // 拦截所有请求(除静态资源:/public/)
  app.get("*", function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next)
    // const appString = ReactSSR.renderToString(serverEntry);
    // res.send(template.replace("<!-- app -->", appString))
  });
} else {
  const devStatic = require('./util/dev-static');
  devStatic(app)
}

app.use(function (error, req, res, next) {
  console.log('error: ', error)
  res.status(500).send(error)
})

app.listen(3333, function () {
  console.log("server is running at port 3333")
});



