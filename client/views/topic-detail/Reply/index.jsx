import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateformat from 'dateformat'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'

import styles from './style'

const Reply = ({ reply, classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar src={reply.author.avatar_url} />
      </div>
      <div className={classes.right}>
        <span>{reply.author.loginname} {dateformat(reply.create_at, 'yyyy-MM-dd HH:mm:ss')}</span>
        <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
      </div>
    </div>
  )
}

Reply.propTypes = {
  // replay: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Reply)
