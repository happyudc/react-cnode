import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import {
  // Router,
  BrowserRouter,
} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import pink from 'material-ui/colors/pink'
import red from 'material-ui/colors/red'

// import history from './config/history'
import { AppState, TopicStore } from './store/store'
import App from './views/App'


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
    error: red,
    type: 'light',
  },
})

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const root = document.getElementById('root');

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(createApp(App));

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(createApp(NextApp));
  })
}
