import { Button, Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

export interface CollectionItemProps {
  id: string;
  name: string;
  description: string;
  closeButtonActionHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onClickElementHandler: () => void;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  name,
  closeButtonActionHandler,
  onClickElementHandler,
}) => {
  return (
    <GridItem
      onClick={onClickElementHandler}
      cursor={'pointer'}
      w="100%"
      h="50%"
      color={'#ffff'}
      border={'3px solid #ffff'}
      backgroundColor={'rgba(255, 255, 255, .5)'}
      bgGradient="linear(to-r, #17271f, #374c3c)"
      borderRadius={'5px'}
      _hover={{
        boxShadow: `0 0 10px 5px rgba(8, 29, 20, .9),
      inset 0 0 10px 5px rgba(8, 29, 20, .9)`,
      }}>
      <Flex
        position={'relative'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}>
        <Button
          color={'#ffff'}
          bg={'inherit'}
          onClick={closeButtonActionHandler}
          fontSize={'20px'}
          position={'absolute'}
          right={'0px'}
          top={'0px'}>
          X
        </Button>
        <Text fontSize={'3rem'}>{name}</Text>
      </Flex>
    </GridItem>
  );
};
