import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  centerItem: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
};

const Loading = ({ dimensions }) => (
  <div style={dimensions}>
    <div style={styles.centerItem}>
      <CircularProgress />
    </div>
  </div>

);

export default Loading;
