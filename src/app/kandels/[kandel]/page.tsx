'use client';

import AllPagesWrapper from '@/components/AllPagesWrapper';
import { ChainIdProvider } from '@/components/ChainIdProvider';
import KandleDashboard from '@/components/KandelDashboard';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Address } from 'viem';

// https://github.com/mangrovedao/mangrove-core/blob/develop/src/periphery/MgvReader.sol

const FORMAT_REGEXP = /^(\d+)-(0x[0-9a-fA-F]{40})$/;

// TODO: Move this to a more appropriate place
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
const KandlePage = () => {
  const params = useParams<{ kandel: string }>()
    const kandelProps = useMemo(() => {
      if (!params) {
        return null
      }
      if (!FORMAT_REGEXP.test(params.kandel)) {
        throw new Error(`Incorrect kandel input: ${params.kandel}\nPlease use: <chainId>-<kandelAddress>`)
      }
      const [chainIdStr, kandelAddress] = params.kandel.split('-')
      return {
        chainId: Number(chainIdStr),
        kandelAddress: kandelAddress as Address
      }
    }, [params])

  return (
    <AllPagesWrapper>
      {kandelProps &&
        <ChainIdProvider chainId={kandelProps.chainId}>
          <KandleDashboard kandelAddress={kandelProps.kandelAddress} />
        </ChainIdProvider>
      }
    </AllPagesWrapper>
  )
}

export default KandlePage;
