import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 500,
    height: 3,
    borderRadius: theme.radius.sm,
    // backgroundColor: theme.colors.dark[5],
    backgroundColor: 'rgba(201,201,201,0.3)',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '4000%',
    backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
    // -webkit-box-shadow:0px 0px 30px 0px rgba(25,170,202,1),
    // -moz-box-shadow: 0px 0px 30px 0px rgba(25,170,202,1),
    boxShadow: '0px 0px 30px 0px rgba(25,170,202,1)',
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 500,
    height: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: 500,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 18,
    color: theme.colors.gray[3],
    textShadow: theme.shadows.sm,
    fontFamily: 'Rajdhani',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
              }}
            >
              <Box className={classes.labelWrapper}>
                <Text className={classes.label}>{label}</Text>
              </Box>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
