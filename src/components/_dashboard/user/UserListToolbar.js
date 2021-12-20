import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Toolbar, Typography, OutlinedInput, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';

import TextField from '@material-ui/core/TextField';

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

export default function UserListToolbar({
  numSelected,
  onFilterName,
  onFilterUser,
  showUser,
  title = 'Buscar...',
  users
}) {
  const [{ search, user }, setState] = useState({
    search: '',
    user: ''
  });
  const handleChange = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));

    if (value === 'undefined') {
      onFilterUser('');
    } else {
      onFilterUser(value);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.length > 2) {
      onFilterName(e);
    }

    if (e.target.value === '') {
      onFilterName(e);
    }

    setState((prevState) => ({
      ...prevState,
      search: e.target.value
    }));
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {!showUser && (
            <SearchStyle
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder={title}
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
            />
          )}

          {showUser && (
            <Autocomplete
              id="combo-box-demo-user-list"
              className="autocomplete-custom"
              value={user || users[0]}
              options={users}
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
        </>
      )}
    </RootStyle>
  );
}
