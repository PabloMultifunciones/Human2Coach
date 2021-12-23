import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import Button from '@material-ui/core/Button';

import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Toolbar, Typography, OutlinedInput, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@material-ui/core/TextField';

import Spinner from '../../Spinner';

import { getCollaboratorsRequest, getLeadersRequest } from '../../../actions/generalActions';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

function UserListToolbar(props) {
  const [{ search, user, role, collaborator }, setState] = useState({
    search: '',
    user: '',
    role: 1,
    collaborator: ''
  });

  const handleChange = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));

    if (value === 'undefined') {
      props.onFilterUser('');
    } else {
      props.onFilterUser(value);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.length > 2) {
      props.onFilterName(e);
    }

    if (e.target.value === '') {
      props.onFilterName(e);
    }

    setState((prevState) => ({
      ...prevState,
      search: e.target.value
    }));
  };

  const handleChangeRol = ({ target: { name, value } }) => {
    if (value === 3) {
      if (!props.leaders) {
        props.getLeadersRequest(999);
      }
    }

    if (value === 2) {
      if (!props.collaborators) {
        props.getCollaboratorsRequest(999);
      }
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeCollaborator = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const closeSearch = () => {};

  return (
    <RootStyle
      sx={{
        ...(props.numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {props.numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {props.numSelected} selected
        </Typography>
      ) : (
        <>
          {!props.showUser && (
            <SearchStyle
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder={props.title}
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
            />
          )}

          {props.showUser && (
            <Autocomplete
              id="combo-box-demo-user-list"
              className="autocomplete-custom"
              value={user || props.users[0]}
              options={props.users}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) =>
                `${option.name} ${option.lastName} ${option.username ? `(${option.username})` : ''}`
              }
              onChange={(event, value) => handleChange({ target: { name: 'user' } }, value)}
              renderInput={(params) => (
                <TextField {...params} label="User" variant="outlined" value={user} />
              )}
            />
          )}

          {props.showFilterPlan && (
            <>
              {role === 1 && (
                <FormControl variant="outlined" className="w-custom">
                  <InputLabel id="frequency-select-outlined-label">Rol</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    value={role}
                    label="Rol"
                    onChange={handleChangeRol}
                  >
                    <MenuItem value={1}>Todos </MenuItem>
                    <MenuItem value={2}>Team Leader </MenuItem>
                    <MenuItem value={3}>Colaborador</MenuItem>
                  </Select>
                </FormControl>
              )}

              {role === 2 && (
                <>
                  {props.users_charging ? (
                    <Spinner size={30} />
                  ) : (
                    <>
                      {props.collaborators && (
                        <div className="d-flex w-custom">
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="frequency-select-outlined-label">
                              Collaborator
                            </InputLabel>
                            <Select
                              labelId="collaborator"
                              id="collaborator"
                              name="collaborator"
                              value={collaborator || props.collaborators.content[0].id}
                              label="Collaborator"
                              onChange={handleChangeCollaborator}
                            >
                              {props.collaborators.content.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                  {user.name ? `${user.name} ${user.lastName}` : 'Without name'}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Button
                            className="button-plan-search"
                            variant="contained"
                            color="error"
                            onClick={() => closeSearch()}
                          >
                            Back
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </RootStyle>
  );
}

const mapStateToProps = ({ generalReducer }) => generalReducer;
const mapDispatchToProps = { getCollaboratorsRequest, getLeadersRequest };

export default connect(mapStateToProps, mapDispatchToProps)(UserListToolbar);
