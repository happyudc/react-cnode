const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const ejs = require('ejs')
const memoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server') // 引入服务器端渲染的webpack配置


const serverRender = require('./server-render')

// 获取index.html模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
};

const NativeModule = require('module')
const vm = require('vm')

const serverCompiler = webpack(serverConfig);

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new memoryFs;
serverCompiler.outputFileSystem = mfs;

let serverBundle
// 监听服务器端渲染webpack配置文件的变化
serverCompiler.watch({}, (err, stats) => {
  if (err) { throw err}
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.log(warn));

  //获取打包后的js文件的路径
  const bundlePath = path.join(
      serverConfig.output.path,
      serverConfig.output.filename
  );

  // 读取打包后的js文件,此时读取到的是一个字符串格式的,
  // 不能当做一个模块来使用
  const bundle = mfs.readFileSync(bundlePath, "utf-8");
  // const m = new Module();
  // m._compile(bundle, "server-entry.js");
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports;
})

module.exports = function (app) {

  app.use("/public", proxy({
    target: "http://localhost:8888"
  }));

  app.get('*', function (req, res, next) {
    if(!serverBundle) {
      return res.send('waiting for complie refresh later!')
    }
    getTemplate().then(template => {
        return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
};
