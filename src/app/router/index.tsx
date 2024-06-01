import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import ErrorPage from 'src/shared/ui/error-page';
import { routes } from './routes';
import Loading from 'src/shared/ui/loading';

const router = createBrowserRouter(
  routes.map((route) => {
    return {
      ...route,
      element: (
        <Suspense fallback={<Loading />}>
          <div className="h-screen w-screen">{route.element}</div>
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    };
  }),
);

export default router;
