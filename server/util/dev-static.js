const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const memoryFs = require('memory-fs');
const proxt = require('http-proxy-middleware');
const ReactDomServer = require('react-dom/server');
const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
};


const serverCompiler = webpack(serverConfig);
const Module = module.constructor;
const mfs = new memoryFs;
serverCompiler.outputFileSystem = mfs;

let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) { throw err}
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.log(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );

    const bundle = mfs.readFileSync(bundlePath, "utf-8");
    const m = new Module();
    m._compile(bundle, "server-entry.js");
    serverBundle = m.exports.default

});

module.exports = function (app) {

    app.use("/public", proxt({
        target: "http://localhost:8888"
    }));

    app.get("*", function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace("<!-- app -->", content))
        })
    })
}