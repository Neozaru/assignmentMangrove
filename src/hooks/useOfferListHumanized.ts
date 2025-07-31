import { MarketSide } from '@/types/markets';
import useOfferList, { UseOfferListParams } from './useOfferList';
import { useCallback, useMemo } from 'react';
import { Address, formatUnits } from 'viem';

import { zipWith } from 'lodash';
import { priceFromTick } from '@mangrovedao/mgv';

type OfferData = {
  tick: bigint,
  gives: bigint
}

type OfferMeta = {
  maker: Address
}

type OfferItem = {
  offerId: bigint,
  offerData: OfferData,
  offerMeta: OfferMeta
}

const useOfferListHumanized = ({ market, side, maxOffers }: UseOfferListParams) => {
  const { data, isLoading, isError, error, refetch } = useOfferList({ market, side, maxOffers });

  const humanizeOffer = useCallback(({ offerId, offerData, offerMeta }: OfferItem) => {
    const givesFormatted = formatUnits(offerData.gives, side === MarketSide.ASKS ? market.base.decimals : market.quote.decimals);
    const ratio = priceFromTick(offerData.tick)
    const priceBaseUnits = side === MarketSide.ASKS ? ratio : 1 / ratio;

    // LIMITATION: Probably better to work with BigInt generally speaking without converting to float
    const takes = BigInt(Math.round(Number(offerData.gives) * ratio))

    const takesFormatted = formatUnits(takes, side === MarketSide.ASKS ? market.quote.decimals : market.base.decimals);
    const price = Math.pow(10, market.base.decimals - market.quote.decimals) * priceBaseUnits

    return {
      offerId,
      gives: offerData.gives,
      givesFormatted,
      takes,
      takesFormatted,
      price,
      side,
      maker: offerMeta.maker,
      offerData,
      offerMeta
    }
  }, [market, side]);

  return useMemo(() => {
    if (isLoading || isError || !data) return {
      isLoading,
      isError,
      error,
      data: [],
    }

    // Turns array of arrays (offerIds, offers, metas) into an array of objects { id, offer, meta }
    const wrappedOffers = zipWith(data[1], data[2], data[3], (offerId: bigint, offerData: OfferData, offerMeta: OfferMeta) => ({
      offerId,
      offerData,
      offerMeta
    }));

    const humanizedOffers = wrappedOffers.map(humanizeOffer)

    return {
      isLoading: false,
      isError: false,
      data: humanizedOffers,
      refetch
    }
  }, [data, humanizeOffer, isLoading, isError, error, refetch]);
}

export default useOfferListHumanized;
