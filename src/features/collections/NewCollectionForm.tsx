import { Button, Flex, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CollectionInterface, collectionApi } from '../../api/collection';
import {
  MessageAlert,
  MessageAlertStatus,
  useAlert,
} from '../../UI/MessageAlert';

export const NewCollectionForm = () => {
  const queryClient = useQueryClient();
  const { showAlert: isSuccAlert, show: showSucc } = useAlert();
  const { showAlert: isErrAlert, show: showErr } = useAlert();

  const mutation = useMutation({
    mutationFn: collectionApi.create,
    onSuccess: () => {
      showSucc();
      queryClient.invalidateQueries({
        queryKey: ['collections'],
      });
    },
    onError: (error) => {
      console.log(error);
      showErr();
    },
  });

  const { register, handleSubmit } = useForm<CollectionInterface>();
  const onSubmit: SubmitHandler<CollectionInterface> = (data) =>
    mutation.mutate(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={'column'}>
          <InputGroup paddingBottom={'10px'}>
            <Input
              placeholder="Collection Name"
              {...register('name', { required: true })}
            />
          </InputGroup>

          <InputGroup paddingBottom={'10px'}>
            <Textarea
              placeholder="Description"
              {...register('description')}
              size="sm"
              resize="none"
            />
          </InputGroup>

          <Button colorScheme="teal" size="md" type="submit">
            Create
          </Button>
        </Flex>
      </form>
      {isSuccAlert && (
        <MessageAlert
          title="Collection created successfully!"
          status={MessageAlertStatus.SUCCESS}
        />
      )}
      {isErrAlert && (
        <MessageAlert
          title="Failed to create a collection"
          status={MessageAlertStatus.ERROR}
        />
      )}
    </>
  );
};
