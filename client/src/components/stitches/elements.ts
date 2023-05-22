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
  cursor: 'pointer',

  variants: {
    size: {
      btn_sm: {
        height: '$fontSizes$m',
        padding: '0 0.45rem',
        fontSize: '$xs',
      },

      btn_md: {
        height: '2.65rem',
        padding: '0 0.65rem',
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
          color: 'DimGray',
          borderColor: 'DimGray',
        },
      },

      none: {
        background: 'none',
        color: 'Black',

        '&:hover': {
          color: 'DimGray',
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

    mb1: {
      true: {
        marginBottom: '1rem',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export { A };
