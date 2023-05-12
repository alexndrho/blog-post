import stitches from '../../stitches.config';

const { styled } = stitches;

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  variants: {
    size: {
      fullscreen: {
        width: '80%',
        maxWidth: '80%',
        minHeight: 'calc(100vh - $navHeight * 2)',

        '@desktop': {
          width: '40%',
        },
      },
    },
  },
});

const Label = styled('label', {
  variants: {
    size: {
      md: {
        fontSize: '$s',
      },
    },
    mb0_5: {
      true: {
        marginBottom: '0.5rem',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const Input = stitches.styled('input', {
  border: 'solid 0.09rem $lightGray',
  borderRadius: '0.5rem',
  fontFamily: 'inherit',
  fontWeight: '500',
  outline: 'none',

  '&:focus': {
    borderColor: 'Black',
  },

  variants: {
    size: {
      md: {
        height: '3rem',
        fontSize: '$s',
        padding: '0 0.7rem',
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

const TextArea = stitches.styled('textarea', {
  border: 'solid 0.09rem $lightGray',
  borderRadius: '0.5rem',
  fontFamily: 'inherit',
  fontWeight: '500',
  outline: 'none',
  resize: 'none',

  '&:focus': {
    borderColor: 'Black',
  },

  variants: {
    size: {
      md: {
        height: '15rem',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '$s',
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

const Button = stitches.styled('button', {
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: 'Black',
  color: 'White',
  fontFamily: 'inherit',
  fontWeight: '500',

  variants: {
    size: {
      md: {
        height: '3rem',
        fontSize: '$s',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export { Form, Label, Input, TextArea, Button };
