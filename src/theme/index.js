import React, { useMemo, useEffect, Suspense } from 'react';

import PropTypes from 'prop-types';
// material
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@material-ui/core/styles';
//
import { IntlProvider } from 'react-intl';
import { useTranslation } from 'react-i18next';

import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

import '../GlobalStyles/styles.scss';

import './i18n';

// ----------------------------------------------------------------------

const ConfLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('en');
    // eslint-disable-next-line
  }, []);
  return '';
};

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      breakpoints,
      shadows,
      customShadows
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <Suspense fallback={null}>
      <IntlProvider locale="en">
        <ConfLang />
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </IntlProvider>
    </Suspense>
  );
}
