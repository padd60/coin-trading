import { Outlet, RouteObject } from 'react-router-dom';
import CoinList from 'src/page/coin-list';
import Layout from 'src/shared/ui/layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [{ index: true, element: <CoinList /> }],
  },
];
