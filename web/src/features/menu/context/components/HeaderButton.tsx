import { Button, createStyles } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    borderRadius: theme.radius.sm,
    flex: '1 15%',
    alignSelf: 'stretch',
    height: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 2,
    // background: `radial-gradient(#36495ed0, #1a1f24d0);`,
    background: '#f8ab3c90',
    // background: 'linear-gradient( 109deg, #1a1f24d0 25%, #36495ed0 75%)',
  },
  root: {
    border: 'none',
  },
  label: {
    // color: params.canClose === false ? theme.colors.dark[2] : theme.colors.dark[0],
    color: 'white',
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} fontSize={iconSize} fixedWidth />
    </Button>
  );
};

export default HeaderButton;
