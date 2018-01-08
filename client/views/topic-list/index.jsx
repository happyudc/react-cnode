import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  observer,
  inject,
} from 'mobx-react'
import Button from 'material-ui/Button'
import Container from '../../layout/Container'

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
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Button raised color="primary">Buttom</Button>
        <span> {this.props.appState.msg}</span>
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
};
