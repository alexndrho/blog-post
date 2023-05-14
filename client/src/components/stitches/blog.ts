import stitches from '../../stitches.config';

const { styled } = stitches;

const TitleBlog = styled('h2', {
  variants: {
    size: {
      md: {
        fontSize: '$s',

        '@tablet': {
          fontSize: '$l',
        },
      },
    },
    mb1: {
      true: {
        marginBottom: '1rem',
        '@tablet': {
          marginBottom: '2rem',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const BodyBlog = styled('p', {
  textAlign: 'justify',

  variants: {
    size: {
      md: {
        fontSize: '$xs',

        '@tablet': {
          fontSize: '$s',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const TitleItem = styled('h3', {
  variants: {
    size: {
      md: {
        marginBottom: '0.75rem',
        fontSize: '$s',

        '@desktop': {
          fontSize: '$m',
          fontWeight: '700',
        },
      },
    },

    mb0_75: {
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

const SnippetItem = styled('p', {
  textAlign: 'justify',

  variants: {
    size: {
      md: {
        fontSize: '$xs',

        '@desktop': {
          fontSize: '$s',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export { TitleBlog, BodyBlog, TitleItem, SnippetItem };
