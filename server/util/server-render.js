const ejs = require('ejs')
const serialize = require('serialize-javascript')
const proxy = require('http-proxy-middleware')
const Helmet = require('react-helmet').default
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default
const colors = require('material-ui/colors')


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
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette: {
        primary: colors.purple,
        secondary: colors.lightBlue,
        error: colors.red,
        type: 'light'
      }
    })
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url);
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
        link: helmet.link && helmet.link.toString(),
        materiaCss: sheetsRegistry.toString(),
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
