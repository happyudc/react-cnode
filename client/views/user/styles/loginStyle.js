/**
 * Created by YuDc on 2018/1/13.
 */
const inputWidth = 300

export default () => {
  return {
    root: {
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: inputWidth,
      marginBottom: 20,
    },
    loginBottom: {
      width: inputWidth,
    },
  }
}
