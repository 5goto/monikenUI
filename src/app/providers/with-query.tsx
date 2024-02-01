import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient();

export const withQuery = (component: () => React.ReactNode) => () =>
  (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      {component()}
    </QueryClientProvider>
  );
