import { apiClient } from 'src/shared/api';
import { CoinListRequestParam, CoinListResponse } from './model';

export const getCoinList = async (params: CoinListRequestParam) => {
  const res = await apiClient.get<CoinListResponse>('/coins/markets', {
    params,
  });
  return res;
};
