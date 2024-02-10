import { useMutation, useQueryClient } from '@tanstack/react-query';
import { routesApi } from '../../../api/routes';

export const useRouteDeleteMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: routesApi.delete,
    onSuccess: () => {
      console.log('Deleted!');
      queryClient.invalidateQueries({
        queryKey: ['routes'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
