import stitches from '../../stitches.config';
import { useAuth } from '../../context/useAuth';
import LoginToContinue from '../../components/auth/LoginToContinue';
import { Title, Label, Input, Button } from '../../components/stitches/form';
import { IUserIcon } from '../../types/userIcon';
import { IUser } from '../../types/user';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { styled } = stitches;

// container
const Main = styled('main', {
  margin: '0 auto',
  width: '80%',
  maxWidth: '1000px',
  padding: '3rem 0 6rem 0',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
});

// user icon
const IconSection = styled('section', {
  gridColumn: 'span 2',

  display: 'flex',
  flexDirection: 'column',

  '@tablet': {
    gridColumn: 'span 1',
    alignItems: 'center',
  },
});

const ProfileContainer = styled('div', {
  position: 'relative',
  marginRight: '2.5rem',
  marginBottom: '2.5rem',
  width: '7.5rem',

  '@desktop': {
    width: '10rem',
  },
});

const ErrorMsg = styled('p', {
  marginBottom: '1rem',
  width: '100%',
  color: 'Red',
  fontSize: '$xs',
  fontWeight: '500',
});

const IconContainer = styled('div', {
  position: 'relative',
});

const Icon = styled('img', {
  width: '100%',
  borderRadius: '50%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  userSelect: 'none',

  variants: {
    blank: {
      true: {
        backgroundColor: 'Gray',
      },
    },
  },
});

const IconButtonContainer = styled('div', {
  position: 'absolute',
  bottom: '10%',
});

const IconButton = styled('button', {
  position: 'relative',
  left: 0,

  border: 'none',
  borderRadius: '0.35em',
  padding: '0.25rem 0.5em',
  color: 'White',
  backgroundColor: 'Black',
  fontFamily: 'inherit',
  fontSize: '$xxs',
  fontWeight: '500',
  appearance: 'none',

  '@tablet': {
    fontSize: '$xs',
  },
});

const IconEditModal = styled('dialog', {
  width: '7.5rem',
  padding: '0.35rem 0',
  bottom: '0',
  transform: 'translate(0, calc(100% + 0.75em))',
  border: 'none',
  borderRadius: '0.35em',
  color: 'White',
  backgroundColor: 'Black',

  '@tablet': {
    width: '10rem',
  },

  '&::before': {
    content: '',
    position: 'absolute',
    left: '15%',
    bottom: '100%',
    border: '0.5rem solid',
    borderColor: 'transparent transparent Black transparent',
  },
});

const IconEditModalOption = styled('p', {
  padding: '0.5em 0.75em',
  paddingRight: '2em',
  display: 'block',
  fontSize: '$xxs',
  userSelect: 'none',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'gray',
  },

  '@tablet': {
    fontSize: '$xs',
  },
});

const Span = styled('span', {
  marginRight: '0.5em',
});

// form
const Form = styled('form', {
  gridColumn: 'span 2',

  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '1.5rem 2.5rem',

  '@tablet': {
    gridColumn: 'span 1',
  },
});

const ColumnSpan1 = styled('div', {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',

  '@desktop': {
    gridColumn: 'span 1',
  },
});

const ColumnSpan2 = styled('div', {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',
});

const SettingsUser = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUser | null>();
  const [base64Icon, setBase64Icon] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const iconEditDialogRef = useRef<HTMLDialogElement | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const [profileIcon, setProfileIcon] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/user`,
          {
            headers: {
              'x-access-token': localStorage.getItem('token') as string,
            },
          }
        );

        const responseData = await response.json();
        if (responseData) setUserData(responseData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getUserIcon = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/user/icon`,
          {
            headers: {
              'x-access-token': localStorage.getItem('token') as string,
            },
          }
        );

        const userIcon: IUserIcon = await response.json();
        if (userIcon)
          setBase64Icon(
            `data:${userIcon.mime};base64,` +
              btoa(String.fromCharCode(...new Uint8Array(userIcon.image.data)))
          );
      } catch (err) {
        console.error(err);
      }
    };

    getUserIcon();
  }, []);

  const showIconOptions = () => {
    if (iconEditDialogRef.current?.open) {
      iconEditDialogRef.current.close();
    } else {
      iconEditDialogRef.current?.show();
    }
  };

  const handleIconInput = async () => {
    iconEditDialogRef.current?.close();

    const file = iconInputRef.current?.files?.[0];
    if (!file) return;

    setProfileIcon(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Icon(reader.result as string);
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileIcon) formData.append('profileIcon', profileIcon);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('location', location);
    formData.append('contact', contact);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_SERVER}/user`,
        {
          method: 'PUT',
          headers: {
            'x-access-token': localStorage.getItem('token') as string,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        navigate(0);
      } else if (responseData.message) {
        setErrorMsg(responseData.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) return <LoginToContinue />;

  return (
    <Main>
      <Title css={{ marginBottom: '2rem', gridColumn: 'span 2' }}>
        Public profile
      </Title>

      <IconSection>
        <ProfileContainer>
          {ErrorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

          <IconContainer>
            {base64Icon ? (
              <Icon src={base64Icon} alt="profile-icon" />
            ) : (
              <Icon blank />
            )}

            <IconButtonContainer>
              <IconButton onClick={showIconOptions}>
                <Span>&#128393;</Span>Edit
              </IconButton>

              <IconEditModal ref={iconEditDialogRef}>
                <IconEditModalOption as="label">
                  <Input
                    type="file"
                    ref={iconInputRef}
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    role="menuitem"
                    onChange={handleIconInput}
                    css={{ display: 'none' }}
                  />
                  Upload a photo
                </IconEditModalOption>

                <IconEditModalOption role="menuitem">
                  Remove photo
                </IconEditModalOption>
              </IconEditModal>
            </IconButtonContainer>
          </IconContainer>
        </ProfileContainer>
      </IconSection>

      <Form onSubmit={handleFormSubmit}>
        <ColumnSpan1>
          <Label htmlFor="first-name" fw6 mb0_5>
            First Name
          </Label>
          <Input
            id="first-name"
            placeholder={`${userData?.firstName ? userData.firstName : ''}`}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </ColumnSpan1>

        <ColumnSpan1>
          <Label htmlFor="last-name" fw6 mb0_5>
            Last Name
          </Label>
          <Input
            id="last-name"
            placeholder={`${userData?.lastName ? userData.lastName : ''}`}
            onChange={(e) => setLastName(e.target.value)}
          />
        </ColumnSpan1>

        <ColumnSpan2>
          <Label htmlFor="username" fw6 mb0_5>
            Username
          </Label>
          <Input
            id="username"
            placeholder={`${userData?.username ? userData.username : ''}`}
            onChange={(e) => setUserName(e.target.value)}
          />
        </ColumnSpan2>

        <ColumnSpan2>
          <Label htmlFor="email" fw6 mb0_5>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={`${userData?.email ? userData.email : ''}`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ColumnSpan2>

        <ColumnSpan2>
          <Label htmlFor="location" fw6 mb0_5>
            Location
          </Label>
          <Input
            id="location"
            placeholder={`${userData?.location ? userData.location : ''}`}
            onChange={(e) => setLocation(e.target.value)}
          />
        </ColumnSpan2>

        <ColumnSpan2>
          <Label htmlFor="contact" fw6 mb0_5>
            Contact
          </Label>
          <Input
            id="contact"
            placeholder={`${userData?.contact ? userData.contact : ''}`}
            onChange={(e) => setContact(e.target.value)}
          />
        </ColumnSpan2>

        <ColumnSpan2>
          <Button>Save</Button>
        </ColumnSpan2>
      </Form>
    </Main>
  );
};

export default SettingsUser;
