import '../main.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError(err) {
        console.log({ err }, 'queries 오류');
        return true;
      },
      refetchOnMount: false,
    },
    mutations: {
      onError(err) {
        console.log({ err }, 'mutation 오류');
      },
    },
  },
});

function App() {
  return (
    <>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
