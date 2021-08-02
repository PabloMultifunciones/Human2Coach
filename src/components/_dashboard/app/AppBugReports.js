// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ color, backgroundcolor, theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color,
  backgroundColor: backgroundcolor
}));

const IconWrapperStyle = styled('div')(({ color, theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppBugReports(props) {
  return (
    <RootStyle color={props.color} backgroundcolor={props.backgroundcolor}>
      <IconWrapperStyle color={props.color}>{props.icon}</IconWrapperStyle>
      <Typography variant="h3">{props.number}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.title}
      </Typography>
    </RootStyle>
  );
}
