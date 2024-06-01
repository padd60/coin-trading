import { Outlet, RouteObject } from 'react-router-dom';
import CoinBookmarkList from 'src/page/coin-bookmark/ui/coin-bookmark-list';
import CoinAllList from 'src/page/coin-list/ui/coin-all-list';
import Layout from 'src/shared/ui/layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <CoinAllList /> },
      { path: 'bookmark', element: <CoinBookmarkList /> },
    ],
  },
];
