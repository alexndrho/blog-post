import stitches from '../../stitches.config';

const { styled } = stitches;

const Container = styled('section');

const Title = styled('h2', {
  fontSize: '$s',
  fontWeight: '600',
  padding: '0.5rem 0',
  borderBottom: '1.5px solid',
  marginBottom: '2.5rem',
});

const InfoContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridRowGap: '0.5rem',
  marginBottom: '1rem',
});

const InfoLabel = styled('span', {
  fontSize: '$s',
  fontWeight: '500',
  marginRight: '0.5rem',
});

const InfoText = styled('span', {
  fontSize: '$s',
  fontWeight: '500',
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
            <InfoLabel>Contact:</InfoLabel>
            <InfoText>{contact}</InfoText>
          </>
        )}

        {location && (
          <>
            <InfoLabel>Location:</InfoLabel>
            <InfoText>{location}</InfoText>
          </>
        )}

        {email && (
          <>
            <InfoLabel>Email:</InfoLabel>
            <InfoText>{email}</InfoText>
          </>
        )}
      </InfoContainer>
    </Container>
  );
};

export default ProfileAbout;
