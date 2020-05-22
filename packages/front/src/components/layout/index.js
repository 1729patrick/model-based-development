import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: '#fff',
    '&:hover': { color: '#fff', textDecoration: 'none' },
  },
  navLinkActive: {
    marginBottom: -2,
    borderBottom: '2px solid #fff',
  },
  children: {
    padding: 50,
    marginTop: 60,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              Musics
            </Typography>
            <NavLink
              to="/"
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
            >
              <Button color="inherit">Songs</Button>
            </NavLink>
            <NavLink
              to="/a"
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
            >
              <Button color="inherit">Songs</Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.children}>{children}</div>
    </>
  );
}
