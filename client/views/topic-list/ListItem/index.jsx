import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import dateformat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import Avatar from 'material-ui/Avatar'

import { tabs } from '../../../util/variableDefine'
import { topicPrimaryStyle, SecondaryStyle } from './styles'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })

  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.reply}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间: {dateformat(topic.create_at, 'yyyy-MM:dd HH:mm:ss')}
    </span>
  </span>
)
const PrimaryWithStyle = withStyles(topicPrimaryStyle)(Primary)

const SecondaryWithStyle = withStyles(SecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<PrimaryWithStyle topic={topic} />}
      secondary={<SecondaryWithStyle topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem
