import { useCallback } from 'react';
import useOfferListHumanized from './useOfferListHumanized';
import { MarketSide } from '@/types/markets';
import { MarketParams } from '@mangrovedao/mgv';
import { Order } from '@/types';

type Props = {
  market: MarketParams
  maxOffers: number
}

const useOrderBook = ({ market, maxOffers }: Props) => {

  const { data: asksOfferList, isLoading: isAsksOfferListLoading, refetch: refetchAsks } = useOfferListHumanized({
    market,
    maxOffers,
    side: MarketSide.ASKS
  })

  const { data: bidsOfferList, isLoading: isBidsOfferListLoading, refetch: refetchBids } = useOfferListHumanized({
    market,
    maxOffers,
    side: MarketSide.BIDS
  })

  const refetch = useCallback(() => {
    refetchAsks?.()
    refetchBids?.()
  }, [refetchAsks, refetchBids])

  return {
    data: {
      asks: asksOfferList as Order[],
      bids: bidsOfferList as Order[],
    },
    isLoading: isAsksOfferListLoading || isBidsOfferListLoading,
    refetch
  }
}

export default useOrderBook;
