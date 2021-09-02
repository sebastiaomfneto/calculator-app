import { FC, useMemo } from 'react';
import {
  Paper,
  Grid,
  GridProps,
  Button,
  ButtonProps,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Backspace } from '@material-ui/icons';

import { useEntries, ADD_ENTRY, CALCULATE_RESULT, RESET } from '../hooks';

type CalculatorButton = Pick<
  ButtonProps & GridProps,
  'color' | 'variant' | 'onClick' | 'xs'
> & {
  value: string;
};

export const Calculator: FC = () => {
  const {
    state: { entries, result },
    dispatch,
  } = useEntries();

  const buttons = useMemo<CalculatorButton[]>(
    () => [
      {
        value: '7',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '7' }),
      },
      {
        value: '8',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '8' }),
      },
      {
        value: '9',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '9' }),
      },
      {
        value: '/',
        color: 'primary',
        variant: 'outlined',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '/' }),
      },
      {
        value: '4',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '4' }),
      },
      {
        value: '5',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '5' }),
      },
      {
        value: '6',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '6' }),
      },
      {
        value: '*',
        color: 'primary',
        variant: 'outlined',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '*' }),
      },
      {
        value: '1',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '1' }),
      },
      {
        value: '2',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '2' }),
      },
      {
        value: '3',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '3' }),
      },
      {
        value: '-',
        color: 'primary',
        variant: 'outlined',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '-' }),
      },
      {
        value: '0',
        color: 'default',
        variant: 'text',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '0' }),
      },
      {
        value: '=',
        color: 'primary',
        variant: 'contained',
        xs: 6,
        onClick: () => dispatch({ type: CALCULATE_RESULT }),
      },

      {
        value: '+',
        color: 'primary',
        variant: 'outlined',
        xs: 3,
        onClick: () => dispatch({ type: ADD_ENTRY, payload: '+' }),
      },
    ],
    [dispatch]
  );

  return (
    <Paper variant="outlined">
      <Box padding={3}>
        <Box marginY={1}>
          <Paper variant="outlined">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              gridColumnGap="8px"
              height="56px"
              paddingY={2}
              paddingX={1}
            >
              <Typography align="right" data-testid="result-text">
                {result || entries || '0'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => dispatch({ type: RESET })}
                data-testid="button-reset"
              >
                <Backspace fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Box>
        <Grid container spacing={1}>
          {buttons.map(({ color, variant, value, xs, onClick }) => (
            <Grid key={value} item xs={xs}>
              <Button
                color={color}
                variant={variant}
                fullWidth
                onClick={onClick}
                data-testid={`button-${value}`}
              >
                {value}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};
