'use client';

import AllPagesWrapper from '@/components/AllPagesWrapper';
import MarketDashboardWrapper from '@/components/MarketDashboardWrapper';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

// https://github.com/mangrovedao/mangrove-core/blob/develop/src/periphery/MgvReader.sol

// TODO: Move this to a more appropriate place
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const FORMAT_REGEXP = /^(\d+)-(0x[0-9a-fA-F]{40})-(0x[0-9a-fA-F]{40})-(\d+)$/;

const isCorrectMarketInput = (s: string) => FORMAT_REGEXP.test(s)

const MarketPage = () => {
  const params = useParams<{ market: string }>()
  const marketProps = useMemo(() => {
    if (!params) {
      return null
    }
    if (!isCorrectMarketInput(params.market)) {
      throw new Error(`Incorrect market input: ${params.market}\nPlease use: <chainId>-<baseTokenAddress>-<quoteTokenAddress>-<tickSpacing>`)
    }
    const [chainIdStr, baseTokenAddress, quoteTokenAddress, tickSpacingStr] = params.market.split('-')
    return {
      chainId: Number(chainIdStr),
      baseTokenAddress,
      quoteTokenAddress,
      tickSpacing: BigInt(tickSpacingStr)
    }
  }, [params])

  return (
    <AllPagesWrapper>
      {marketProps && <MarketDashboardWrapper marketProps={marketProps} />}
    </AllPagesWrapper>
  )
}

export default MarketPage;
