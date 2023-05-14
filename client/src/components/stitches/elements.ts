import stitches from '../../stitches.config';

const { styled } = stitches;

const A = styled('a', {
  textDecoration: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 'auto',
  paddingBottom: 'auto',
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: 'Black',
  color: 'White',
  fontFamily: 'inherit',
  fontWeight: '600',

  variants: {
    size: {
      btn_sm: {
        height: '2.75rem',
        padding: '0 0.75rem',
        fontSize: '$xs',
      },

      //form btn
      md: {
        height: '3rem',
        fontSize: '$s',
      },
    },

    color: {
      outline: {
        border: '0.15rem solid Black',
        background: 'none',
        color: 'Black',

        '&:hover': {
          color: '$lightBlack',
          borderColor: '$lightBlack',
        },
      },

      none: {
        background: 'none',
        color: 'Black',

        '&:hover': {
          color: '$lightBlack',
        },
      },
    },

    heightAuto: {
      true: {
        height: 'auto',
      },
    },

    mr1: {
      true: {
        marginRight: '1rem',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export { A };
