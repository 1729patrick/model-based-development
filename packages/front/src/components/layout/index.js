import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Links from './Links';

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
            <Links />
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.children}>{children}</div>
    </>
  );
}
