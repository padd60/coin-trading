import '../main.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError(err) {
        console.log({ err }, 'queries 오류');
        return true;
      },
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
          <Suspense>
            <div className="h-screen w-screen p-5">
              <RouterProvider router={router} />
            </div>
          </Suspense>
        </QueryClientProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
