import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Avatar, Box, createStyles, Group, keyframes, Stack, Text } from '@mantine/core';
import React from 'react';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 99, 160, 0.13)',
    // background: `radial-gradient(#36495ed0, #1a1f24d0);`,
    // background: 'linear-gradient( 109deg, #1a1f24d0 30%, #36495ed0 75%)',
    background: 'radial-gradient(circle, rgba(12,30,42,0.8743872549019608) 3%, rgba(11,39,53,0.9108018207282913) 81%)',
    color: theme.colors.dark[0],
    padding: 5,
    borderRadius: theme.radius.sm,
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
  },
  containerGreen: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 99, 160, 0.13)',
    // background: `radial-gradient(#36495ed0, #1a1f24d0);`,
    // background: 'linear-gradient( 109deg, #1a1f24d0 30%, #36495ed0 75%)',
    background: 'radial-gradient(circle, rgba(12,42,37,0.8743872549019608) 3%, rgba(11,53,45,0.9108018207282913) 81%)',
    color: theme.colors.dark[0],
    padding: 5,
    borderRadius: theme.radius.sm,
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
  },
  containerRed: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 99, 160, 0.13)',
    background: 'radial-gradient(circle, rgba(42,12,12,0.8743872549019608) 3%, rgba(53,11,11,0.9108018207282913) 81%)',
    color: theme.colors.dark[0],
    padding: 5,
    borderRadius: theme.radius.sm,
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
  },
  containerYellow: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 99, 160, 0.13)',
    background:
      'radial-gradient(circle, rgba(174,179,31,0.8743872549019608) 3%, rgba(184,187,34,0.9108018207282913) 81%)',
    color: theme.colors.dark[0],
    padding: 5,
    borderRadius: theme.radius.sm,
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 12,
    color: 'white',
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
}));

// I hate this
const enterAnimationTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const enterAnimationBottom = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const exitAnimationTop = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

const exitAnimationRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
});

const exitAnimationLeft = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
});

const exitAnimationBottom = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;
    // Backwards compat with old notifications
    let position = data.position;
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.icon = 'circle-info';
          break;
      }
    }
    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: t.visible
              ? `${position?.includes('bottom') ? enterAnimationBottom : enterAnimationTop} 0.2s ease-out forwards`
              : `${
                  position?.includes('right')
                    ? exitAnimationRight
                    : position?.includes('left')
                    ? exitAnimationLeft
                    : position === 'top-center'
                    ? exitAnimationTop
                    : position
                    ? exitAnimationBottom
                    : exitAnimationRight
                } 0.4s ease-in forwards`,
            ...data.style,
          }}
          className={
            data.type === 'error'
              ? classes.containerRed
              : data.type === 'success'
              ? classes.containerGreen
              : data.type === 'warning'
              ? classes.containerYellow
              : classes.container
          }
        >
          <Group noWrap spacing={12}>
            {data.icon && (
              <>
                {!data.iconColor ? (
                  <Avatar
                    color={
                      data.type === 'error'
                        ? 'red'
                        : data.type === 'success'
                        ? 'teal'
                        : data.type === 'warning'
                        ? 'yellow'
                        : 'blue'
                    }
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    radius="xl"
                    size={32}
                  >
                    <LibIcon icon={data.icon} fixedWidth size="lg" animation={data.iconAnimation} />
                  </Avatar>
                ) : (
                  <LibIcon
                    icon={data.icon}
                    animation={data.iconAnimation}
                    style={{
                      color: data.iconColor,
                      alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                    }}
                    fixedWidth
                    size="lg"
                  />
                )}
              </>
            )}
            <Stack spacing={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: data.id?.toString(),
        duration: data.duration || 3000,
        position: position || 'top-right',
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
