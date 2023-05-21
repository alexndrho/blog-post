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
        maxWidth: '$formWidth',

        '@mobile': {
          width: '40%',
        },
      },
    },
  },
});

const Title = styled('h2', {
  variants: {
    size: {
      md: {
        fontSize: '$m',
        marginBottom: '0.75rem',

        '@desktop': {
          marginBottom: '1rem',
          fontSize: '$title',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const Label = styled('label', {
  variants: {
    size: {
      md: {
        fontSize: '$xs',

        '@desktop': {
          fontSize: '$s',
        },
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

const Input = styled('input', {
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
        height: '2.75rem',
        fontSize: '$xs',
        padding: '0 0.65rem',

        '@desktop': {
          padding: '0 0.7rem',
          height: '3rem',
          fontSize: '$s',
        },
      },
    },
    mb0_25: {
      true: {
        marginBottom: '0.25rem',
      },
    },
    mb1: {
      true: {
        marginBottom: '0.75rem',
        '@desktop': {
          marginBottom: '1rem',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const TextArea = styled('textarea', {
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
        padding: '0.65rem',
        marginBottom: '1rem',
        fontSize: '$xs',

        '@desktop': {
          height: '15rem',
          padding: '0.75rem',
          fontSize: '$s',
        },
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

const Button = styled('button', {
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: 'Black',
  color: 'White',
  fontFamily: 'inherit',
  fontWeight: '600',

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
        height: '2.75rem',
        fontSize: '$xs',
        padding: '0 0.7rem',

        '@desktop': {
          height: '3rem',
          fontSize: '$s',
        },
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

const Info = styled('p', {
  variants: {
    size: {
      md: {
        marginTop: '0.5rem',
        fontSize: '$xs',

        '@desktop': {
          marginTop: '0.75rem',
          fontSize: '$s',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export { Form, Title, Label, Input, TextArea, Button, Info };
