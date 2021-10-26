import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import toastr from 'toastr';

import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';

import 'toastr/build/toastr.min.css';

/** *****Services******* */

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 }
];

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  textField: {
    width: '50ch',
    marginBottom: '5px'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}{' '}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function UserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [{ name, team, role, state }, setState] = useState({
    name: '',
    team: { title: 'Bicycle Thieves', year: 1948 },
    role: '',
    state: 'Activo'
  });

  const handleChange = (event, value) => {
    if (event.target.name === 'state') {
      if (value === 'Inactivo') {
        toastr.warning('¿Está seguro de cambiar a estado inactivo a un usuario activo?');
      }
    }
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  return (
    <>
      <Tooltip title="Editar fecha de compromiso">
        <EditIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Usuario
        </DialogTitle>

        <>
          <DialogContent dividers>
            {props.type !== 'BOOLEAN' && (
              <>
                <Container maxWidth="lg">
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        fullWidth
                        id="outlined-name"
                        label="Nombre"
                        value={name}
                        name="name"
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        value={team}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, value) =>
                          handleChange({ target: { name: 'team' } }, value)
                        }
                        renderInput={(params) => (
                          <TextField {...params} fullWidth label="Equipo" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl variant="outlined" className="w-100">
                        <InputLabel id="frequency-select-outlined-label">Rol</InputLabel>
                        <Select
                          onChange={(event) => handleChange(event, event.target.value)}
                          value={role}
                          labelId="role"
                          id="role"
                          name="role"
                          label="Rol"
                          fullWidth
                        >
                          <MenuItem value="Colaborador">Colaborador</MenuItem>
                          <MenuItem value="Team Leader">Team Leader </MenuItem>
                          <MenuItem value="Team Manager">Team Manager </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl variant="outlined" className="w-100">
                        <InputLabel id="frequency-select-outlined-label">Estado</InputLabel>
                        <Select
                          onChange={(event) => handleChange(event, event.target.value)}
                          value={state}
                          labelId="state"
                          id="state"
                          name="state"
                          label="Estado"
                          fullWidth
                        >
                          <MenuItem value="Activo">Activo</MenuItem>
                          <MenuItem value="Inactivo">Inactivo </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              {t('menu.trivia-panel-dialog-add-test-button-close', 'Close')}
            </Button>

            <Button onClick={handleClose} color="primary">
              {t('admin.header-dropdown-dialog-actions-save', 'Save')}
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}
