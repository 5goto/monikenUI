import { Button, Flex, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import React, { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../UI/Alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionApi } from '../../api/collection';

export interface CollectionItemProps {
  id: string;
  name: string;
  description: string;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({ id, name }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/collections/${name}/routes`);
  };

  const onDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpen();
    event.stopPropagation();
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: collectionApi.delete,
    onSuccess: () => {
      console.log('Deleted!');
      queryClient.invalidateQueries({
        queryKey: ['collections'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onConfirmActionHandler = () => {
    mutation.mutate(id);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
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
          position={'relative'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}>
          <Button
            bg={'inherit'}
            onClick={onDeleteHandler}
            fontSize={'40px'}
            position={'absolute'}
            right={'0px'}
            top={'0px'}>
            X
          </Button>
          <Text fontSize={'3rem'}>{name}</Text>
        </Flex>
      </GridItem>
      <Alert
        cancelRef={cancelRef as unknown as RefObject<HTMLElement>}
        isOpen={isOpen}
        onClose={onClose}
        actionHandler={onConfirmActionHandler}
        question="Delete this collection?"
        message="This action will delete all routes nested in this collection"
      />
    </>
  );
};
