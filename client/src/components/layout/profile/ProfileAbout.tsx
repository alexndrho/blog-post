import { styled } from '../../../stitches.config';

const Container = styled('section');

const Title = styled('h2', {
  fontSize: '$m-5',
  fontWeight: '600',
  padding: '0.25rem 0',
  borderBottom: '1.5px solid',
  marginBottom: '1rem',

  '@desktop': {
    fontSize: '$4',
    marginBottom: '1.5rem',
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
  fontSize: '$m-5',
  fontWeight: '500',

  '@desktop': {
    fontSize: '$5',
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
