import { readerAbi } from '@/abi/reader';
import assignmentConfig from '@/assignment.config';
import { useChainId } from '@/components/ChainIdProvider';
import { MarketParams } from '@mangrovedao/mgv';
import { useReadContract } from 'wagmi';

const useMarketConfig = (market: MarketParams) => {
  const { chainId } = useChainId()
  return useReadContract({
    address: assignmentConfig.mgvReaderAddress,
    abi: readerAbi,
    functionName: 'marketConfig',
    args: [
      {
        tkn0: market.base.address,
        tkn1: market.quote.address,
        tickSpacing: market.tickSpacing,
      }
    ],
    chainId,
  });
}

export default useMarketConfig
