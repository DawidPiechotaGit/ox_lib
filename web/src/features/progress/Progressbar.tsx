import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 500,
    height: 8,
    borderRadius: '5px',
    // backgroundColor: 'rgba(201,201,201,0.3)',
    background: 'repeating-linear-gradient(135deg, #8286867e, #8286867e 1.4px, transparent 3px, transparent 4px)',
    overflow: 'hidden',
    // transform: 'skew(-35deg)'
    // clipPath: 'polygon(calc(0% + 0px) 0%, calc(5% - 2px) 0%, calc(5% - 2px) 100%, calc(0% + 0px) 100%, calc(5% + 2px) 0%, calc(10% - 2px) 0%, calc(10% - 2px) 100%, calc(5% + 2px) 100%, calc(10% + 2px) 0%, calc(15% - 2px) 0%, calc(15% - 2px) 100%, calc(10% + 2px) 100%, calc(15% + 2px) 0%, calc(20% - 2px) 0%, calc(20% - 2px) 100%, calc(15% + 2px) 100%, calc(20% + 2px) 0%, calc(25% - 2px) 0%, calc(25% - 2px) 100%, calc(20% + 2px) 100%, calc(25% + 2px) 0%, calc(30% - 2px) 0%, calc(30% - 2px) 100%, calc(25% + 2px) 100%, calc(30% + 2px) 0%, calc(35% - 2px) 0%, calc(35% - 2px) 100%, calc(30% + 2px) 100%, calc(35% + 2px) 0%, calc(40% - 2px) 0%, calc(40% - 2px) 100%, calc(35% + 2px) 100%, calc(40% + 2px) 0%, calc(45% - 2px) 0%, calc(45% - 2px) 100%, calc(40% + 2px) 100%, calc(45% + 2px) 0%, calc(50% - 2px) 0%, calc(50% - 2px) 100%, calc(45% + 2px) 100%)',
    // transform: 'skew(-30deg)',
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
    // boxShadow: '0px 0px 15px 0px rgba(25,170,202,1)',
    boxShadow: '0px 0px 30px #19abca'
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 500,
    height: -10,
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between'
  },
  label: {
    maxWidth: 500,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
    fontWeight: 700,
    color: theme.colors.gray[3],
    // textShadow: theme.shadows.sm,
    // fontFamily: 'Red Hat Display',
    fontFamily: 'Geist',
    textTransform: 'uppercase',
    paddingBottom: '10px',
    textShadow: '0px 0px 15px #000'
  },
  labelP: {
    maxWidth: 500,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
    fontWeight: 700,
    color: '#19abca',
    // textShadow: theme.shadows.sm,
    // fontFamily: 'Red Hat Display',
    fontFamily: 'Geist',
    textTransform: 'uppercase',
    textShadow: '0px 0px 5px #19abca80'
  },
  pop: {
    display:' flex',
    flexDirection: 'column-reverse',
    gap: '25px'
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [value, setValue] = React.useState(0);

  // useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    if (visible) return;
    setValue(0);
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue;
      });
    }, onePercent);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
        <div className={classes.pop}>
          <Box className={classes.labelWrapper}>
            <Text className={classes.label}>{label}</Text>
            <Text className={classes.labelP}>{value}%</Text>
          </Box>
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
