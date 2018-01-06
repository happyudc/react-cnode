import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  observer,
  inject,
} from 'mobx-react'
import {
  AppState,
} from '../../store/appState';


@inject('appState') @observer
export default class TopicList extends React.Component {
  componentDidMount() {
    // do something
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.number = 3
        resolve(true)
      })
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <span> {this.props.appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
};
