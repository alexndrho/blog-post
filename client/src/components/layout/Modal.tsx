import { styled } from '../../stitches.config';
import { Button } from '../common/form';
import { useEffect, useMemo, useRef } from 'react';

interface Props {
  show: boolean;
  message: string;
  btnText: string;
  onConfirm: () => void;
  onCancel: () => void;
  btnColor?: 'secondary' | 'inverted';
}

const ModalContainer = styled('dialog', {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  fontSize: '1.25rem',
  fontWeight: '500',
  border: '0.15em solid Black',
  width: '80%',
  borderRadius: '0.5em',
  padding: '0.75em',

  '&::backdrop': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  '@tablet': {
    fontSize: '1.75rem',
    width: '50%',
  },

  '@desktop': {
    fontSize: '2rem',
    width: '35%',
  },
});

const ModalContent = styled('p', {
  paddingBottom: '0.75em',
});

const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '0.5em',

  [`& ${Button}`]: {
    fontSize: '0.75em',
    fontWeight: 'inherit',

    width: '100%',
    height: 'auto',
    borderRadius: '0.25em',
    padding: '0.45em 0.5em',
  },
});

const Modal = ({
  show,
  message,
  btnText,
  onConfirm,
  onCancel,
  btnColor,
}: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const confirmBtnColor = useMemo(() => {
    if (btnColor === 'secondary') {
      return 'black';
    } else if (btnColor === 'inverted') {
      return 'danger';
    } else {
      return 'black';
    }
  }, [btnColor]);
  const cancelBtnColor = useMemo(() => {
    if (btnColor === 'secondary') {
      return 'outline';
    } else if (btnColor === 'inverted') {
      return 'black';
    } else {
      return 'danger';
    }
  }, [btnColor]);

  useEffect(() => {
    if (!modalRef.current) return;

    // show modal if show is true and modal is not open
    if (show) {
      if (!modalRef.current.open) {
        modalRef.current.showModal();
      }
    } else {
      if (modalRef.current.open) {
        modalRef.current.close();
      }
    }
  }, [show]);

  return (
    <ModalContainer ref={modalRef}>
      <ModalContent>{message}</ModalContent>

      <ButtonContainer>
        <Button color={confirmBtnColor} onClick={onConfirm}>
          {btnText}
        </Button>

        <Button color={cancelBtnColor} onClick={onCancel}>
          Cancel
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default Modal;
