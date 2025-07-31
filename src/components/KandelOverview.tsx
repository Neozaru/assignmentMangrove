import useOrderBook from '@/hooks/useOrderBook';
import { formatUnits } from 'viem'
import OrderbookView from './OrderbookView';
import { MarketParams } from '@mangrovedao/mgv';
import { KandelInfo } from '@/types';

type Props = {
  kandel: KandelInfo
  market: MarketParams
}
const KandelOverview = ({ kandel, market }: Props) => {
  const { data: orderbook } = useOrderBook({
    market,
    maxOffers: 100
  })

  return (<div className='flex-col'>
    <h1 className="text-2xl pb-4">Kandel {kandel.address}</h1>
    <OrderbookView market={market} asks={orderbook.asks} bids={orderbook.bids} showMine={true} myAddress={kandel.address} />
    <div className='flex flex-col items-center'>
      <div>Base reserve: {formatUnits(kandel.baseReserve, kandel.baseToken.decimals)} {kandel?.baseToken.symbol}</div>
      <div>Quote reserve: {formatUnits(kandel.quoteReserve, kandel.quoteToken.decimals)} {kandel?.quoteToken.symbol}</div>
    </div>
  </div>)
}

export default KandelOverview
