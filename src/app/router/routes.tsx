import { RouteObject } from 'react-router-dom';
import CoinList from 'src/page/coin-list';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <CoinList />,
  },
];
