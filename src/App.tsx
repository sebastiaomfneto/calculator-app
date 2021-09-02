import { FC } from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@material-ui/core';

import { theme } from './theme';
import { Calculator } from './components';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Container maxWidth="xs">
          <Calculator />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
