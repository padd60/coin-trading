import { useSuspenseQuery } from '@tanstack/react-query';
import { coinList } from './queryKey';
import { CoinListRequestParam } from '../model';
import { getCoinList } from '../api';

export const useGetCoinList = (params: CoinListRequestParam) => {
  const listParam: CoinListRequestParam = {
    ...params,
    page: params.page ? params.page : 1,
    per_page: params.per_page ? params.per_page : 50,
  };

  return useSuspenseQuery({
    queryKey: coinList.page(params.page ?? 1, params.per_page ?? 50).queryKey,
    queryFn: () => getCoinList(listParam),
  });
};
