const ejs = require('ejs')
const serialize = require('serialize-javascript')
const proxy = require('http-proxy-middleware')
const Helmet = require('react-helmet').default
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')


const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url);
    asyncBootstrap(app).then(() => {
      const content = ReactDomServer.renderToString(app);
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.mate && helmet.mate.toString(),
        title: helmet.title && helmet.title.toString(),
        style: helmet.style && helmet.style.toString(),
        link: helmet.link && helmet.link.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
