import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    borderRadius: theme.radius.sm,
    // backgroundColor: 'transparent',
    background: 'linear-gradient( 109deg, #1a1f24d0 25%, #36495ed0 75%)',
    height: 60,
    width: 368,
    marginLeft: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  heading: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 400,
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
