import { createTheme } from '@material-ui/core';
import { blue, cyan } from '@material-ui/core/colors';
import { enUS } from '@material-ui/core/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: blue['500'],
      },
      secondary: {
        main: cyan['A400'],
      },
    },
  },
  enUS
);
