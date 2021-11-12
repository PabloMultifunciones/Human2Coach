// routes
import Router from './routes';
import axiosconf from './axios';

// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

// ---------------------------------------------------------------------

export default function App() {
  axiosconf();
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
