import { useSuspenseQuery } from '@tanstack/react-query';
import { coinDetail } from './queryKey';
import { getCoinDetail } from '../api';

export const useGetCoinDetail = (id: string) =>
  useSuspenseQuery({
    queryKey: coinDetail.id(id).queryKey,
    queryFn: () => getCoinDetail(id),
  });
