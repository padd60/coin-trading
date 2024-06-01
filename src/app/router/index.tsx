import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import ErrorPage from 'src/shared/ui/error-page';
import { routes } from './routes';

const router = createBrowserRouter(
  routes.map((route) => {
    return {
      ...route,
      element: (
        <Suspense>
          <div style={{ width: '100%', height: '100%' }}>{route.element}</div>
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    };
  }),
);

export default router;
