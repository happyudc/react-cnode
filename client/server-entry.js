import React from 'react'
import { JssProvider } from 'react-jss'
import { MuiThemeProvider } from 'material-ui/styles'
import { StaticRouter } from 'react-router-dom'
import {
  Provider,
  useStaticRendering,
} from 'mobx-react'
import App from './views/App'

import { createStoreMap } from './store/store'

// 让mobx在服务端渲染 不会重复的数据变化
useStaticRendering(true)

export default (stores, context, sheetsRegistry, jss, theme, url) => (
  <Provider {...stores}>
    <StaticRouter location={url} context={context}>
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)
export { createStoreMap }
