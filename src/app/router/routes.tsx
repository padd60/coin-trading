import { RouteObject } from 'react-router-dom';
import HomePage from 'src/page/home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
];
