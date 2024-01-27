import { Button, Flex, Input, InputGroup } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CollectionInterface, createCollection } from '../../api/collection';

export const NewCollectionForm = () => {
  const mutation = useMutation({
    mutationFn: createCollection.create,
    onSuccess: () => {
      console.log('Request done!');
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
          <Input placeholder="Description" {...register('description')} />
        </InputGroup>

        <Button colorScheme="teal" size="md" type="submit">
          Create
        </Button>
      </Flex>
    </form>
  );
};
