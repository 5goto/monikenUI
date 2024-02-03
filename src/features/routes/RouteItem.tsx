import { Flex, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export interface RouteItemProps {
  id?: string;
  name: string;
  endpoint: string;
}

export const RouteItem: React.FC<RouteItemProps> = ({ id, name, endpoint }) => {
  const navigate = useNavigate();
  const { collectionName } = useParams();
  const onClickHandler = () => {
    navigate(`/collections/${collectionName}/routes/${id}`);
  };

  return (
    <GridItem
      onClick={onClickHandler}
      cursor={'pointer'}
      w="300px"
      h="150px"
      color={'#081D14'}
      backgroundColor={'rgba(255, 255, 255, .5)'}
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
      </Flex>
    </GridItem>
  );
};
