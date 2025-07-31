
import useOrderBook from '@/hooks/useOrderBook';
import { useMemo, useState } from 'react';
import OrderbookView from './OrderbookView';
import { useSavedKandels } from '@/hooks/useSavedKandels';
import Link from 'next/link';
import generateLinkForKandel from '@/lib/generateLinkForKandel';
import CtaButton from './CtaButton';
import CreateKandelModal from './CreateKandelModal';
import { MarketParamsAndChainId } from '@/types';

type Props = {
  market: MarketParamsAndChainId
}

const MarketDashboard = ({ market }: Props) => {

  const [showKandelCreateModal, setShowKandelCreateModal] = useState(false)

  const { data: orderbook } = useOrderBook({
    market,
    maxOffers: 100
  });

  const { kandels } = useSavedKandels()

  const savedKandelsForThisMarket = useMemo(() => {
    return kandels.filter(k =>
      k.market.base.address.toLocaleLowerCase() === market.base.address.toLocaleLowerCase() &&
      k.market.quote.address.toLocaleLowerCase() === market.quote.address.toLocaleLowerCase() &&
      k.market.chainId.toString() === market.chainId.toString() &&
      k.market.tickSpacing.toString() === market.tickSpacing.toString())
  }, [kandels, market])

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>{market.base.symbol}/{market.quote.symbol} (tick: {market.tickSpacing})</h1>

      <OrderbookView market={market} asks={orderbook.asks} bids={orderbook.bids} />
      
      <CtaButton text={'Create Kandel'} callback={() => setShowKandelCreateModal(true)}/>
      <h2 className='text-xl'>Manage Saved Kandels:</h2>
      {savedKandelsForThisMarket?.map(kandel => (
        <div key={kandel.address}>
          Kandel: <Link className='text-blue-500' href={generateLinkForKandel(kandel)} target='_blank'>{kandel.address} ↗</Link>
        </div>
      ))}

      {showKandelCreateModal && <CreateKandelModal
        market={market}
        onClose={() => setShowKandelCreateModal(false)}
      />}
    </div>
  );
}

export default MarketDashboard