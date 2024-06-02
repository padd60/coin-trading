import { apiClient } from 'src/shared/api';
import { CoinDetailResponse } from './model';

export const getCoinDetail = async (id: string) => {
  const res = await apiClient.get<CoinDetailResponse>(`/coins/${id}`);
  return res;
};
