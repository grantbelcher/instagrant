import React from 'react';
import IconButton from '@material-ui/core/IconButton';

// const styles = {
//   icon: {
//     marginRight: '1vw',
//     marginLeft: '1vw',
//   },
// };

const Menu = ({ logOut, device }) => {
  console.log('menu');
  return (
    <IconButton onClick={logOut}>
      <i className="fas fa-bars fa-lg" />
    </IconButton>
  );
};

export default Menu;
