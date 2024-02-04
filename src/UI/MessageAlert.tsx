import { Alert, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export enum MessageAlertStatus {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface MessageAlertProps {
  title: string;
  status: MessageAlertStatus;
}

export const useAlert = () => {
  const [showAlert, setShowComponent] = useState(false);

  const show = () => {
    setShowComponent(!showAlert);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

  return { showAlert, show };
};

export const MessageAlert: React.FC<MessageAlertProps> = ({
  title,
  status,
}) => {
  return (
    <Alert
      status={status}
      color={'initial'}
      position={'absolute'}
      bottom={'50px'}
      right={'-250px'}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
      </Box>
    </Alert>
  );
};
