import { styled } from '../../stitches.config';
import { useAuth } from '../../context/useAuth';
import Notification from '../../components/layout/Notification';
import LoginToContinue from '../LoginToContinue';
import { Title, Label, Input, Button } from '../../components/common/form';
import { getUser, getUserIcon } from '../../utils/userApi';
import IUser from '../../types/IUser';
import React, { useEffect, useCallback, useRef, useState } from 'react';

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
  fontSize: '$m-6',
  fontWeight: '500',
  appearance: 'none',

  '@desktop': {
    fontSize: '$6',
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
  fontSize: '$m-6',
  userSelect: 'none',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'gray',
  },

  '@desktop': {
    fontSize: '$6',
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

  const [userData, setUserData] = useState<IUser | null>(null);
  const [base64Icon, setBase64Icon] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [profileIcon, setProfileIcon] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const iconEditDialogRef = useRef<HTMLDialogElement | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);

  // callbacks
  const updateUserData = useCallback(async () => {
    getUser()
      .then((data) => {
        if (data?.error) throw new Error(data.error.message);

        if (data) {
          setUserData(data as IUser);
        } else {
          setUserData(null);
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffects
  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  useEffect(() => {
    if (!userData?.username) return;

    getUserIcon()
      .then((icon) => {
        if (icon?.error) throw new Error(icon.error.message);

        if (icon?.mime && icon?.image?.data) {
          setBase64Icon(
            `data:${icon.mime};base64,` +
              btoa(String.fromCharCode(...new Uint8Array(icon.image.data)))
          );
        } else {
          setBase64Icon('');
          throw new Error('User icon not found');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userData]);

  // handlers
  const resetForm = () => {
    setProfileIcon(null);
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setLocation('');
    setContact('');

    firstNameRef.current?.value && (firstNameRef.current.value = '');
    lastNameRef.current?.value && (lastNameRef.current.value = '');
    usernameRef.current?.value && (usernameRef.current.value = '');
    emailRef.current?.value && (emailRef.current.value = '');
    locationRef.current?.value && (locationRef.current.value = '');
    contactRef.current?.value && (contactRef.current.value = '');
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

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
            'x-access-token': localStorage.getItem('token') || '',
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        setErrorMsg(responseData.error.message);
        setShowNotification(true);
      } else {
        resetForm();
        setErrorMsg('');
        updateUserData();

        setShowNotification(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) return <LoginToContinue />;

  return (
    <>
      {showNotification &&
        (errorMsg === '' ? (
          <Notification
            message="Profile updated successfully"
            onClose={handleCloseNotification}
          />
        ) : (
          <Notification message={errorMsg} onClose={handleCloseNotification} />
        ))}

      <Main>
        <Title css={{ marginBottom: '2rem', gridColumn: 'span 2' }}>
          Public profile
        </Title>

        <IconSection>
          <ProfileContainer>
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
              ref={firstNameRef}
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
              ref={lastNameRef}
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
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
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
              ref={emailRef}
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
              ref={locationRef}
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
              ref={contactRef}
              onChange={(e) => setContact(e.target.value)}
            />
          </ColumnSpan2>

          <ColumnSpan2>
            <Button>Save</Button>
          </ColumnSpan2>
        </Form>
      </Main>
    </>
  );
};

export default SettingsUser;
