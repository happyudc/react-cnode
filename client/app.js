import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import {
  BrowserRouter,
} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import appStore from '../client/store/appStore'
import App from './views/App'

// ReactDom.hydrate(<App />, document.getElementById('root'));

const root = document.getElementById('root');

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider appStore={appStore}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(NextApp);
  })
}
