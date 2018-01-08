export const topicPrimaryStyle = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      color: '#555',
    },
    tab: {
      backgroundColor: theme.palette.primary[500],
      textAlign: 'center',
      display: 'inline-block',
      padding: '2px 6px',
      color: '#fff',
      borderRadius: 3,
      marginRight: 10,
      fontSize: 12,
    },
  }
}

export const SecondaryStyle = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: 3,
    },
    count: {
      textAlign: 'center',
      marginRight: 20,
    },
    userName: {
      color: '#9e9e9e',
      marginRight: 20,
    },
    reply: {
      color: theme.palette.secondary[300],
    },
  }
}
