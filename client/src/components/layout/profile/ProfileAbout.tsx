import { styled } from '../../../stitches.config';

const Container = styled('section');

const Title = styled('h2', {
  fontSize: '$xs',
  fontWeight: '600',
  padding: '0.25rem 0',
  borderBottom: '1.5px solid',
  marginBottom: '1rem',

  '@tablet': {
    padding: '0.5rem 0',
    fontSize: '$xs',
  },

  '@desktop': {
    marginBottom: '2.5rem',
    fontSize: '$s',
  },
});

const InfoContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridAutoColumns: 'auto',
  gridRowGap: '0.5rem',
  marginBottom: '1rem',
});

const InfoText = styled('span', {
  fontSize: '$xxs',
  fontWeight: '500',

  '@tablet': {
    fontSize: '$xs',
  },

  '@desktop': {
    fontSize: '$s',
  },
});

interface Props {
  contact?: string;
  location?: string;
  email?: string;
}

const ProfileAbout = ({ contact, location, email }: Props) => {
  return (
    <Container>
      <Title>Contact Information</Title>
      <InfoContainer>
        {contact && (
          <>
            <InfoText>Contact:</InfoText>
            <InfoText>{contact}</InfoText>
          </>
        )}

        {location && (
          <>
            <InfoText>Location:</InfoText>
            <InfoText>{location}</InfoText>
          </>
        )}

        {email && (
          <>
            <InfoText>Email:</InfoText>
            <InfoText>{email}</InfoText>
          </>
        )}
      </InfoContainer>
    </Container>
  );
};

export default ProfileAbout;
