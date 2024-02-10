import { Button, Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

export interface RouteItemProps {
  id: string;
  name: string;
  endpoint: string;
  closeButtonActionHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onClickElementHandler: () => void;
}

export const RouteItem: React.FC<RouteItemProps> = ({
  name,
  endpoint,
  closeButtonActionHandler,
  onClickElementHandler,
}) => {
  return (
    <GridItem
      onClick={onClickElementHandler}
      cursor={'pointer'}
      w="300px"
      h="150px"
      color={'#ffff'}
      border={'3px solid #ffff'}
      backgroundColor={'rgba(255, 255, 255, .5)'}
      bgGradient="linear(to-r, #17271f, #374c3c)"
      borderRadius={'5px'}
      _hover={{
        boxShadow: `0 0 10px 5px rgba(8, 29, 20, .9), /* Внешняя тень */
      inset 0 0 10px 5px rgba(8, 29, 20, .9)`,
      }}>
      <Flex
        position={'relative'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}>
        <Text position={'absolute'} top={'5px'} left={'5px'}>
          {endpoint}
        </Text>
        <Text fontSize={'3rem'}>{name}</Text>
        <Button
          onClick={closeButtonActionHandler}
          color={'#ffff'}
          bg={'inherit'}
          fontSize={'20px'}
          position={'absolute'}
          right={'0px'}
          top={'0px'}>
          X
        </Button>
      </Flex>
    </GridItem>
  );
};
