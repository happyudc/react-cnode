import React from 'react'
import PropTypes from 'prop-types'
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

  render() {
    return (
      <div>
        {this.props.appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
};
