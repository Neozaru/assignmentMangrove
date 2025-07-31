import { readerAbi } from '@/abi/reader';
import assignmentConfig from '@/assignment.config';
import { useChainId } from '@/components/ChainIdProvider';
import { MarketSide } from '@/types/markets';
import { MarketParams } from '@mangrovedao/mgv';
import { useReadContract } from 'wagmi';

export type UseOfferListParams = {
  market: MarketParams;
  maxOffers: number;
  side: MarketSide;
}

const useOfferList = ({ market, maxOffers, side }: UseOfferListParams) => {
  // Possible optimization: have a hook using useReadContract[S] that returns the offer list for both sides
  const { chainId } = useChainId()
  const { data, isLoading, isError, error, refetch } = useReadContract({
    address: assignmentConfig.mgvReaderAddress,
    abi: readerAbi,
    functionName: 'offerList',
    args: [
      {
        inbound_tkn: side === MarketSide.ASKS ? market.quote.address : market.base.address,
        outbound_tkn: side === MarketSide.ASKS ? market.base.address : market.quote.address,
        tickSpacing: BigInt(market.tickSpacing),
      },
      BigInt(0),
      BigInt(maxOffers)
    ],
    chainId
  });

  return { data, isLoading, isError, error, refetch };
}

export default useOfferList;
