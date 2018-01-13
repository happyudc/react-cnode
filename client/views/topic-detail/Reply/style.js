/**
 * Created by YuDc on 2018/1/13.
 */

export default (theme) => {
  return {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 0',
    },
    header: {
      padding: '10px 24px',
      borderBottom: '1px solid #dfdfdf',
      '& h3': {
        margin: 0,
      },
    },
    body: {
      padding: '0 24px',
      '& img': {
        maxWidth: '100%',
      },
      '& ul, & ol': {
        marginBottom: 7,
      },
    },
    replyHeader: {
      backgroundColor: theme.palette.primary[500],
      padding: '10px 24px',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
    },
    replies: {
      margin: '0 24px',
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: 24,
      paddingBottom: 0,
      borderBottom: '1px solid #dfdfdf',
    },
    left: {
      marginRight: 20,
    },
    right: {
      '& img': {
        maxWidth: '100%',
        display: 'block',
      },
    },
  }
}
