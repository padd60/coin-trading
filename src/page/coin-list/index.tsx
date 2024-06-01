import { useGetCoinList } from 'src/entity/coin-list/query/useGetCoinList';

const CoinList = () => {
  const { data } = useGetCoinList({ vs_currency: 'krw' });
  console.log('data', data);

  return (
    <div>
      <h1>홈페이지</h1>
    </div>
  );
};

export default CoinList;
