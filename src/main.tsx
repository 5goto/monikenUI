import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Collections } from './pages/Collections.tsx';
import { Main } from './pages/Main.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RoutesPage } from './pages/RoutesPage.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen />
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="collections" element={<Collections />} />
          <Route
            path="collections/:collectionName/routes"
            element={<RoutesPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>
);
