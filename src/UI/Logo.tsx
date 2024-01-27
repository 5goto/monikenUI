import { Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface LogoProps {
  str: string;
}

export const Logo: React.FC<LogoProps> = ({ str }) => {
  const navigate = useNavigate();

  return (
    <Text
      position={'absolute'}
      right={'2%'}
      bottom={'2%'}
      fontSize={'60px'}
      color={'#ffff'}
      cursor={'pointer'}
      onClick={() => navigate('/')}>
      {str}
    </Text>
  );
};
