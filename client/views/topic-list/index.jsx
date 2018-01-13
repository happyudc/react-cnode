import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'
import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import {
  observer,
  inject,
} from 'mobx-react'

// import history from '../../config/history'

import Container from '../../layout/Container'

import TopicListItem from './ListItem'
import { TopicStore } from '../../store/store'
import { tabs } from '../../util/variableDefine'
// import {
//   AppState,
// } from '../../store/appState';


@inject((stores) => {
  return {
    // appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
export default class TopicList extends React.Component {
  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  getTab = (search) => {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  handleChangeTab = (event, value) => {
    this.props.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  handleListItemClick = (topic) => {
    this.props.history.push(`/detail/${topic.id}`)
  }

  render() {
    const {
      topics,
      syncing,
    } = this.props.topicStore

    const tab = this.getTab()

    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tab} onChange={this.handleChangeTab}>
          {
            Object.keys(tabs).map(t => <Tab key={t} label={tabs[t]} value={t} />)
          }
        </Tabs>
        <List>
          {
            topics.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={() => { this.handleListItemClick(topic) }}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncing ?
            (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '40px 0',
                }}
              >
                <CircularProgress color="accent" size={100} />
              </div>
            ) :
            null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  // appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}
