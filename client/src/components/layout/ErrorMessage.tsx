import { styled } from '../../stitches.config';

const Div = styled('div', {
  padding: '0 1.25rem',
  backgroundColor: '$danger',
  borderRadius: '0.5rem',
  color: 'White',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  height: '4rem',
  fontSize: '$s',
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
