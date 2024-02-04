import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionApi } from '../../../api/collection';

export const useDeleteMutation = () => {
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

  return mutation;
};
