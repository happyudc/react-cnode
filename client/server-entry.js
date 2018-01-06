import React from 'react'

import { StaticRouter } from 'react-router-dom'
import {
  Provider,
  useStaticRendering,
} from 'mobx-react'
import App from './views/App'

import { createStoreMap } from './store/store'

// 让mobx在服务端渲染 不会重复的数据变化
useStaticRendering(true)

export default (stores, context, url) => (
  <Provider {...stores}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
)
export { createStoreMap }
