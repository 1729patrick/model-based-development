import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const styles = {
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#fff',
      textTranform: 'capilatize',
    },
  },
  navLinkActive: {
    marginBottom: -2,
    borderBottom: '2px solid #fff',
  },
};

export default () => {
  return (
    <>
      <NavLink
        to="/albums"
        style={styles.navLink}
        activeStyle={styles.navLinkActive}
      >
        <Button color="inherit">Albums</Button>
      </NavLink>
      <NavLink
        to="/artists"
        style={styles.navLink}
        activeStyle={styles.navLinkActive}
      >
        <Button color="inherit">Artists</Button>
      </NavLink>
      <NavLink
        to="/genres"
        style={styles.navLink}
        activeStyle={styles.navLinkActive}
      >
        <Button color="inherit">Genres</Button>
      </NavLink>
      <NavLink
        to="/songs"
        style={styles.navLink}
        activeStyle={styles.navLinkActive}
      >
        <Button color="inherit">Songs</Button>
      </NavLink>
    </>
  );
};
