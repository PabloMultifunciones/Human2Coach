import React, { useState } from 'react';
import toastr from 'toastr';
import { useTranslation } from 'react-i18next';

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

import {
  getCollaboratorsRequest,
  getCollaboratorsByLeadersRequest,
  getLeadersRequest
} from '../../../actions/generalActions';
import 'toastr/build/toastr.min.css';

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
  const [{ search, user, role, leader, collaboratorLeader, collaborator }, setState] = useState({
    search: '',
    user: '',
    role: 1,
    leader: 'ALL',
    collaboratorLeader: 'ALL',
    collaborator: 'ALL'
  });
  const { t } = useTranslation();

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
    if (!props.plansReducer.plans_charging) {
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
    }
  };

  /** ********************NEW SEARCH****************** */

  const handleChangeRol = ({ target: { name, value } }) => {
    if (value === 2) {
      if (!props.leaders) {
        props.getLeadersRequest(999).then((r) => {
          if (r.content && r.content.length === 0) {
            toastr.error(t('do-not-have-leaders', 'Tu no tienes lideres'));
          }
        });
      }
    }

    if (value === 3) {
      if (!props.leaders) {
        props.getLeadersRequest(999).then((r) => {
          if (r.content && r.content.length === 0) {
            toastr.error(t('do-not-have-leaders', 'Tu no tienes líderes'));
          }
        });
      }
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeLeader = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    props.onFilterUser(value);
  };

  const handleChangeCollaboratorLeader = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    props.getCollaboratorsByLeadersRequest(value).then((r) => {
      if (r.content && r.content.length === 0) {
        toastr.error(t('do-not-have-leaders-collaborator', 'Ese lider no tiene colaboradores'));
      }
    });
  };

  const handleChangeCollaborator = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    props.onFilterUser(value);
  };

  const closeSearch = () => {
    setState((prevState) => ({
      ...prevState,
      role: 1,
      leader: 'ALL',
      collaboratorLeader: 'ALL',
      collaborator: 'ALL'
    }));
    props.onFilterUser('ALL');
  };

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
          {props.numSelected} {t('selected', 'Seleccionado')}
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
              value={user || props.usersArray[0]}
              options={props.usersArray}
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
                  <InputLabel id="frequency-select-outlined-label">
                    {t('admin.header-dropdown-view-conditions-table-role', 'Rol')}
                  </InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    value={role}
                    label="Rol"
                    onChange={handleChangeRol}
                  >
                    <MenuItem value={1}>{t('select-rol', 'Selecciona un rol')} </MenuItem>
                    <MenuItem value={2}>{t('team-leader', 'Lider del equipo')} </MenuItem>
                    <MenuItem value={3}>{t('collaborator', 'Colaborador')}</MenuItem>
                  </Select>
                </FormControl>
              )}

              {role === 2 && (
                <>
                  {props.generalReducer.users_charging ? (
                    <Spinner size={30} />
                  ) : (
                    <>
                      {props.generalReducer.leaders && (
                        <div className="d-flex w-custom">
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="frequency-select-outlined-label">
                              {t('select-leader', 'Selecciona un lider')}{' '}
                            </InputLabel>
                            <Select
                              labelId="leader"
                              id="leader"
                              name="leader"
                              value={leader}
                              label={t('select-leader', 'Selecciona un lider')}
                              onChange={handleChangeLeader}
                            >
                              <MenuItem value="ALL">
                                {t('select-leader', 'Selecciona un lider')}
                              </MenuItem>
                              {props.generalReducer.leaders.content.map((user) => (
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
                            {t('back.label', 'Anterior')}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {role === 3 && collaboratorLeader === 'ALL' && (
                <>
                  {props.users_charging ? (
                    <Spinner size={30} />
                  ) : (
                    <>
                      {props.leaders && (
                        <div className="d-flex w-custom">
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="frequency-select-outlined-label">
                              {t('select-leader', 'Selecciona un lider')}
                            </InputLabel>
                            <Select
                              labelId="collaboratorLeader"
                              id="collaboratorLeader"
                              name="collaboratorLeader"
                              value={collaboratorLeader}
                              label={t('select-leader', 'Selecciona un lider')}
                              onChange={handleChangeCollaboratorLeader}
                            >
                              <MenuItem value="ALL">
                                {t('select-leader', 'Selecciona un lider')}
                              </MenuItem>
                              {props.leaders.content.map((user) => (
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
                            {t('back.label', 'Anterior')}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {role === 3 && collaboratorLeader !== 'ALL' && (
                <>
                  {props.users_charging ? (
                    <Spinner size={30} />
                  ) : (
                    <>
                      {props.collaboratorsByLeader && (
                        <div className="d-flex w-custom">
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="frequency-select-outlined-label">
                              {t('collaborator', 'Colaborador')}
                            </InputLabel>
                            <Select
                              labelId="collaborator"
                              id="collaborator"
                              name="collaborator"
                              value={collaborator}
                              label="Collaborator"
                              onChange={handleChangeCollaborator}
                            >
                              <MenuItem value="ALL">
                                {t('select-collaborator', 'Selecciona un colaborador')}
                              </MenuItem>
                              {props.collaboratorsByLeader.content.map((user) => (
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
                            {t('back.label', 'Anterior')}
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

const mapStateToProps = ({ plansReducer, generalReducer }) => ({ plansReducer, generalReducer });
const mapDispatchToProps = {
  getCollaboratorsRequest,
  getCollaboratorsByLeadersRequest,
  getLeadersRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListToolbar);
