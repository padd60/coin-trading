import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { coinList } from './queryKey';
import { CoinListRequestParam } from '../model';
import { getCoinList } from '../api';

export const useGetCoinList = (params: CoinListRequestParam) => {
  const limit = params.per_page ?? 50;

  return useSuspenseInfiniteQuery({
    queryKey: coinList.list.queryKey,
    queryFn: ({ pageParam }) => getCoinList({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length + 1;
    },
  });
};
