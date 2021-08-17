import { FC } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { theme } from './theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div />
    </ThemeProvider>
  );
};

export default App;
