import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 
      params.position === 'top-center' ? 'baseline' :
      params.position === 'bottom-center' ? 'flex-end' : 'center',
    justifyContent: 
      params.position === 'right-center' ? 'flex-end' :
      params.position === 'left-center' ? 'flex-start' : 'center',
  },
  container: {
    fontSize: 16,
    padding: 12,
    margin: 8,
    // background: `radial-gradient(#36495ed0, #1a1f24d0);`,
    color: 'white',
    //fontFamily: 'Red Hat Display',
    fontFamily: 'Geist',
    fontWeight: 700,
    borderRadius: '4px',
    textShadow: '2px 2px 4px black',
    textTransform: 'uppercase',
    // boxShadow: theme.shadows.sm,
    // letterSpacing: '0.04em',
    // background: 'linear-gradient( 109deg, #1a1f24d0 30%, #36495ed0 75%)',
    // background: 'linear-gradient(90deg, rgba(52,174,203,1) 0%, rgba(52,174,203,1) 2%, rgba(26,51,64,1) 2%)',
  },
}));

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<TextUiProps>({
    text: '',
    position: 'right-center',
  });
  const [visible, setVisible] = React.useState(false);
  const { classes } = useStyles({ position: data.position });

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Box style={data.style} className={classes.container}>
            <Group spacing={12}>
              {data.icon && (
                <LibIcon
                  icon={data.icon}
                  fixedWidth
                  size="lg"
                  animation={data.iconAnimation}
                  style={{
                    color: '#243c6b',
                    alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                    backgroundImage: 'linear-gradient(to top, rgb(72 198 239 / 71%) 0%, rgb(111 134 214 / 72%) 100%)',
                    boxShadow: '0px 0px 15px #19abca',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #19abca'
                  }}
                />
              )}
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Group>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
