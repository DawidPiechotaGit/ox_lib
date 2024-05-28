import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Box, Center, createStyles, Group, keyframes, RingProgress, Stack, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
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
    background: 'linear-gradient(0deg, rgba(48,101,131,1) 4%, rgba(33,37,41,1) 5%)',
    // -webkit-clip-path: polygon(0 0,calc(100% - 32px) 0,100% 60%,100% 100%,0 100%,0 50%);
    clipPath: 'polygon(0 0,calc(100% - 42px) 0,100% 90%,100% 100%,0 100%,0 50%)',
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
    background: 'linear-gradient(0deg, rgba(48,131,83,1) 4%, rgba(33,37,41,1) 5%)',
    clipPath: 'polygon(0 0,calc(100% - 42px) 0,100% 90%,100% 100%,0 100%,0 50%)',
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
    background: 'linear-gradient(0deg, rgba(83,6,6,1) 4%, rgba(33,37,41,1) 5%)',
    clipPath: 'polygon(0 0,calc(100% - 42px) 0,100% 90%,100% 100%,0 100%,0 50%)',
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
    background: 'linear-gradient(0deg, rgba(142,49,205,1) 4%, rgba(33,37,41,1) 5%)',
    clipPath: 'polygon(0 0,calc(100% - 42px) 0,100% 90%,100% 100%,0 100%,0 50%)',
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
    textShadow: '#19abca 1px 0 5px',
    marginRight: '15px',
  },
  titleGreen: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#31B93A',
    textShadow: '#31B93A 1px 0 5px',
    marginRight: '15px',
  },
  titleRed: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#EE1010',
    textShadow: '#EE1010 1px 0 5px',
    marginRight: '15px',
  },
  titleWarning: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: 'normal',
    // color: 'white',
    color: '#8e31cd',
    textShadow: '#8e31cd 1px 0 5px',
    marginRight: '15px',
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

const createAnimation = (from: string, to: string, visible: boolean) => keyframes({
  from: {
    opacity: visible ? 0 : 1,
    transform: `translate${from}`,
  },
  to: {
    opacity: visible ? 1 : 0,
    transform: `translate${to}`,
  },
});

const getAnimation = (visible: boolean, position: string) => {
  const animationOptions = visible ? '0.2s ease-out forwards' : '0.4s ease-in forwards'
  let animation: { from: string; to: string };

  if (visible) {
    animation = position.includes('bottom') ? { from: 'Y(30px)', to: 'Y(0px)' } : { from: 'Y(-30px)', to:'Y(0px)' };
  } else {
    if (position.includes('right')) {
      animation = { from: 'X(0px)', to: 'X(100%)' }
    } else if (position.includes('left')) {
      animation = { from: 'X(0px)', to: 'X(-100%)' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)' };
    } else if (position === 'bottom') {
      animation = { from: 'Y(0px)', to: 'Y(100%)' };
    } else {
      animation = { from: 'X(0px)', to: 'X(100%)' };
    }
  }

  return `${createAnimation(animation.from, animation.to, visible)} ${animationOptions}`
};

const durationCircle = keyframes({
  '0%': { strokeDasharray: `0, ${15.1 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${15.1 * 2 * Math.PI}, 0` },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();
  const [toastKey, setToastKey] = useState(0);

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;

    const toastId = data.id?.toString();
    const duration = data.duration || 3000;

    let iconColor: string;
    let position = data.position || 'top-right';

    data.showDuration = data.showDuration !== undefined ? data.showDuration : true;

    if (toastId) setToastKey(prevKey => prevKey + 1);

    // Backwards compat with old notifications
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

    if (!data.iconColor) {
      switch (data.type) {
        case 'error':
          iconColor = 'red.6';
          break;
        case 'success':
          iconColor = 'teal.6';
          break;
        case 'warning':
          iconColor = 'yellow.6';
          break;
        default:
          iconColor = 'blue.6';
          break;
      }
    } else {
      iconColor = tinycolor(data.iconColor).toRgbString();
    }
    
    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: getAnimation(t.visible, position),
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
                    styles={{
                      root: {
                        '> svg > circle:nth-of-type(2)': {
                          animation: `${durationCircle} linear forwards reverse`,
                          animationDuration: `${duration}ms`,
                        },
                        margin: -3,
                      },
                    }}
                    label={
                      <Center>
                        <ThemeIcon
                          color={iconColor}
                          radius="xl"
                          size={32}
                          variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                        >
                          <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                        </ThemeIcon>
                      </Center>
                    }
                  />
                ) : (
                  <ThemeIcon
                    color={iconColor}
                    radius="xl"
                    size={32}
                    variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                  >
                    <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                  </ThemeIcon>
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
        id: toastId,
        duration: duration,
        position: position,
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
