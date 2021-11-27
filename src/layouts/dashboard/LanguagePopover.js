import { useRef, useState } from 'react';
import { connect } from 'react-redux';

// material
import { alpha } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
// components

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 'es',
    label: 'Spanish',
    icon: '/static/icons/es.png'
  },
  {
    value: 'po',
    label: 'Portuguese',
    icon: '/static/icons/po.png'
  }
];

// ----------------------------------------------------------------------

function LanguagePopover(props) {
  const anchorRef = useRef(null);
  const [open] = useState(false);

  return (
    <>
      <IconButton
        ref={anchorRef}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        {props.userLogged && props.userLogged.user.lang === 'en' && (
          <img src={LANGS[0].icon} alt={LANGS[0].label} width="35" height="30" />
        )}

        {props.userLogged && props.userLogged.user.lang === 'es' && (
          <img src={LANGS[1].icon} alt={LANGS[1].label} width="35" height="30" />
        )}

        {props.userLogged && props.userLogged.user.lang === 'po' && (
          <img src={LANGS[2].icon} alt={LANGS[2].label} width="35" height="30" />
        )}
      </IconButton>
    </>
  );
}

const mapStateToProps = ({ loginReducer }) => loginReducer;

export default connect(mapStateToProps, null)(LanguagePopover);
