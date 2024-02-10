import { useNavigate, useParams } from 'react-router-dom';
import { RouteItem } from '../../entities/routes/ui';
import { useDisclosure } from '@chakra-ui/react';
import React, { RefObject } from 'react';
import { Alert } from '../../UI/Alert';
import { useRouteDeleteMutation } from '../../entities/routes/model/useDeleteMutation';

export interface RouteControlProps {
  id: string;
  name: string;
  endpoint: string;
}

export const RouteControl: React.FC<RouteControlProps> = ({
  id,
  name,
  endpoint,
}) => {
  const navigate = useNavigate();
  const { collectionName } = useParams();
  const onClickHandler = () => {
    navigate(`/collections/${collectionName}/routes/${id}`);
  };

  const onDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpen();
    event.stopPropagation();
  };

  const mutation = useRouteDeleteMutation();

  const onConfirmActionHandler = () => {
    mutation.mutate(id);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <RouteItem
        id={id}
        name={name}
        endpoint={endpoint}
        onClickElementHandler={onClickHandler}
        closeButtonActionHandler={onDeleteHandler}
      />
      <Alert
        cancelRef={cancelRef as unknown as RefObject<HTMLElement>}
        isOpen={isOpen}
        onClose={onClose}
        actionHandler={onConfirmActionHandler}
        question="Delete this route?"
        message={`${name} will be deleted from ${collectionName}`}
      />
    </>
  );
};
