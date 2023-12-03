import React from 'react';
import { Box, Text, createStyles } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 500,
    height: 8,
    borderRadius: '40px',
    // backgroundColor: theme.colors.dark[5],
    backgroundColor: 'rgba(247,169,60,0.1)',
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
    // backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
    backgroundColor: 'rgba(164,1,93,255)',
    // -webkit-box-shadow:0px 0px 30px 0px rgba(25,170,202,1),
    // -moz-box-shadow: 0px 0px 30px 0px rgba(25,170,202,1),
    boxShadow: '0px 0px 15px 0px rgba(164,1,93,255)',
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 500,
    height: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: 500,
    padding: 25,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
    color: theme.colors.gray[3],
    textShadow: theme.shadows.sm,
    // fontFamily: 'Rajdhani',
    fontFamily: 'Nova Square',
    textTransform: 'uppercase',
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
          <Box className={classes.labelWrapper}>
            <Text className={classes.label}>{label}</Text>
          </Box>
          <div style={{ borderRadius: '36px', padding: '5px', backgroundColor: '#2f0926' }}>
            <Box className={classes.container}>
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              ></Box>
            </Box>
          </div>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
