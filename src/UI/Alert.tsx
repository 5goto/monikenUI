import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { RefObject } from 'react';

interface AlertProps {
  cancelRef: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  actionHandler: () => void;
  question: string;
  message?: string;
}

export const Alert: React.FC<AlertProps> = ({
  cancelRef,
  isOpen,
  onClose,
  actionHandler,
  question,
  message,
}) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent
        backgroundColor={'rgba(8, 29, 20, 1)'}
        color={'#ffff'}>
        <AlertDialogHeader>{question}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose}>No</Button>
          <Button colorScheme="red" ml={3} onClick={actionHandler}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
