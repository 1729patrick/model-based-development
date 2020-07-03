import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: '#555',
  },
  button: {
    backgroundColor: '#555',
  },
  ok: {
    backgroundColor: '#555',
    color: '#fff',
    marginLeft: 'auto',
    display: 'flex',
  },
}));

export default function CheckBox({ items = [], onChange, value }) {
  const classes = useStyles();
  const [state, setState] = React.useState(
    value?.reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {}) || {}
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    onChange(
      Object.entries(state)
        .filter(([_, checked]) => checked)
        .map(([id]) => +id)
    );
  }, [state]);

  return (
    <div>
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className={classes.button}
      >
        SELECT OPTIONS
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} className={classes.paper}>
        <FormGroup style={{ paddingLeft: 20 }}>
          {Object.entries(items).map(([id, title]) => (
            <FormControlLabel
              key={id}
              row
              control={
                <Checkbox
                  checked={state[id]}
                  onChange={handleChange}
                  name={id}
                />
              }
              label={title}
            />
          ))}
        </FormGroup>

        <button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className={classes.ok}
        >
          OK
        </button>
      </Popper>
    </div>
  );
}
