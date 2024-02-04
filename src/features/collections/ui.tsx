import { useNavigate } from 'react-router-dom';
import { useDeleteMutation } from '../../entities/collections/model';
import React, { RefObject } from 'react';
import { Alert } from '../../UI/Alert';
import { useDisclosure } from '@chakra-ui/react';
import { CollectionItem } from '../../entities/collections/ui';

export interface CollectionControlProps {
  id: string;
  name: string;
  description: string;
}

export const CollectionControl: React.FC<CollectionControlProps> = ({
  id,
  name,
  description,
}) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/collections/${name}/routes`);
  };

  const onDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpen();
    event.stopPropagation();
  };

  const mutation = useDeleteMutation();

  const onConfirmActionHandler = () => {
    mutation.mutate(id);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <CollectionItem
        name={name}
        description={description}
        id={id}
        onClickElementHandler={onClickHandler}
        closeButtonActionHandler={onDeleteHandler}
      />
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
