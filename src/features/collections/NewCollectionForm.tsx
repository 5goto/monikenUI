import { Button, Flex, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CollectionInterface, collectionApi } from '../../api/collection';

export const NewCollectionForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: collectionApi.create,
    onSuccess: () => {
      console.log('Request done!');
      queryClient.invalidateQueries({
        queryKey: ['collections'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { register, handleSubmit } = useForm<CollectionInterface>();
  const onSubmit: SubmitHandler<CollectionInterface> = (data) =>
    mutation.mutate(data);

  return (
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
  );
};
