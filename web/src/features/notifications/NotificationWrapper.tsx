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
    // background: 'radial-gradient(circle, rgba(12,30,42,0.8743872549019608) 3%, rgba(11,39,53,0.9108018207282913) 81%)',
    background: 'linear-gradient(145deg, rgba(48,101,131,1) 0%, rgba(33,37,41,1) 34%)',
    // background:
    //   'radial-gradient(circle, rgba(36,155,200,0.4547794117647058) 5%, rgba(36,155,200,0.3979166666666667) 95%)',
    // border: '2px solid #19abca',
    color: theme.colors.dark[0],
    padding: 10,
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
    // background: 'radial-gradient(circle, rgba(12,42,37,0.8743872549019608) 3%, rgba(11,53,45,0.9108018207282913) 81%)',
    background: 'linear-gradient(145deg, rgba(48,131,83,1) 0%, rgba(33,37,41,1) 34%)',
    color: theme.colors.dark[0],
    padding: 10,
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
    // background: 'radial-gradient(circle, rgba(42,12,12,0.8743872549019608) 3%, rgba(53,11,11,0.9108018207282913) 81%)',
    background: 'linear-gradient(145deg, rgba(83,6,6,1) 0%, rgba(33,37,41,1) 34%)',
    // background:
    //   'linear-gradient(135deg, rgba(83,6,6,1) 2%, rgba(139,33,33,1) 2%, rgba(139,33,33,1) 3%, rgba(83,6,6,1) 3%, rgba(83,6,6,1) 4%, rgba(139,33,33,1) 4%, rgba(139,33,33,1) 9%, rgba(83,6,6,1) 9%, rgba(83,6,6,1) 11%, rgba(15,17,28,1) 11%)',
    color: theme.colors.dark[0],
    padding: 10,
    borderRadius: theme.radius.sm,
    // fontFamily: 'Teko',
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
  },
  containerWarning: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 99, 160, 0.13)',
    background: 'linear-gradient(135deg, rgba(142,49,205,1) 4%, rgba(33,37,41,1) 27%)',
    color: theme.colors.dark[0],
    padding: 10,
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
    // color: 'white',
    color: '#19abca',
    textShadow: '#19abca 1px 0 10px',
  },
  titleGreen: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#31B93A',
    textShadow: '#31B93A 1px 0 10px',
  },
  titleRed: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#EE1010',
    textShadow: '#EE1010 1px 0 10px',
  },
  titleWarning: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#8e31cd',
    textShadow: '#8e31cd 1px 0 10px',
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
              ? classes.containerWarning
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
                        ? 'violet'
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
              {data.title && (
                <Text
                  className={
                    data.type === 'error'
                      ? classes.titleRed
                      : data.type === 'success'
                      ? classes.titleGreen
                      : data.type === 'warning'
                      ? classes.titleWarning
                      : classes.title
                  }
                >
                  {data.title}
                </Text>
              )}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${
                    !data.title
                      ? data.type === 'error'
                        ? classes.titleRed
                        : data.type === 'success'
                        ? classes.titleGreen
                        : data.type === 'warning'
                        ? classes.titleWarning
                        : classes.title
                      : classes.description
                  } description`}
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
