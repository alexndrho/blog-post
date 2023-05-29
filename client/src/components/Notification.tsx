import stitches from '../stitches.config';
import React from 'react';

const { styled } = stitches;

const NotificationContainer = styled('div', {
  position: 'relative',
  width: '100vw',
  padding: '1.25rem 2rem',
  color: 'White',
  backgroundColor: 'Black',
  fontSize: '$xs',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@desktop': {
    fontSize: '$s',
  },
});

const CloseBtn = styled('button', {
  border: 'none',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
});

interface Props {
  message: React.ReactNode;
  onClose: () => void;
}

const Notication = ({ message, onClose }: Props) => {
  return (
    <NotificationContainer>
      {message} <CloseBtn onClick={onClose}>&#10005;</CloseBtn>
    </NotificationContainer>
  );
};

export default Notication;
