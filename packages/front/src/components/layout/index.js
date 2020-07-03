import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Links from './Links';
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
  children: {
    padding: '110px 50px 50px',
    height: '100vh',
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <div
              style={{
                flex: 1,
              }}
            >
              <NavLink to="/">
                <Typography variant="h6" className={classes.title}>
                  Musics
                </Typography>
              </NavLink>
            </div>
            <Links />
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.children}>{children}</div>
    </>
  );
}
