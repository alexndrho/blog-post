import { styled } from '../../stitches.config';

const Div = styled('div', {
  padding: '0.75rem 1rem',
  backgroundColor: '$danger',
  borderRadius: '0.5rem',
  color: 'White',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  fontSize: '$m-5',

  '@desktop': {
    padding: '1rem 1.25rem',
    fontSize: '$4',
  },
});

const P = styled('p');

const Span = styled('span', {
  marginRight: '0.5rem',
});

interface Prop {
  message: string;
}

const ErrorMessage = ({ message }: Prop) => {
  return (
    <Div>
      <P>
        <Span>&#9888;</Span> {message}
      </P>
    </Div>
  );
};

export default ErrorMessage;
