import { Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface CollectionItemProps {
  id: string;
  name: string;
  description: string;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({ name }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/collections/${name}/routes`);
  };

  return (
    <GridItem
      onClick={onClickHandler}
      cursor={'pointer'}
      w="300px"
      h="300px"
      color={'#081D14'}
      backgroundColor={'rgba(255, 255, 255, .5)'}
      borderRadius={'5px'}
      _hover={{
        boxShadow: `0 0 10px 5px rgba(8, 29, 20, .9), /* Внешняя тень */
      inset 0 0 10px 5px rgba(8, 29, 20, .9)`,
      }}>
      <Flex
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}>
        <Text fontSize={'3rem'}>{name}</Text>
      </Flex>
    </GridItem>
  );
};
