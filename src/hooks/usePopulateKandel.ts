import { useCallback } from 'react';
import kandelInstanceAbi from '@/abi/kandelInstance';
import useWriteContractAndWaitForTransactionReceipt from './useWriteContractAndWaitForTransactionReceipt';
import { Address } from 'viem';
import { DistributionOffer } from '@mangrovedao/mgv';

export type PopulateParams = {
  kandelAddress: Address,
  asks: DistributionOffer[],
  bids: DistributionOffer[],
  baseAmount: bigint,
  quoteAmount: bigint,
  value?: bigint,
  meta: {
    gasprice: bigint,
    gasreq: bigint,
    stepSize: bigint,
    pricePoints: bigint
  }
}

const usePopulateKandel = () => {
  const writeContractAndWaitResult = useWriteContractAndWaitForTransactionReceipt()
  const populateKandel = useCallback(({ kandelAddress, bids, asks, baseAmount, quoteAmount, meta, value }: PopulateParams) => {
    return writeContractAndWaitResult?.writeContract({
      address: kandelAddress,
      abi: kandelInstanceAbi,
      functionName: 'populate',
      args: [
        {
          asks,
          bids,
        },
        meta,
        baseAmount,
        quoteAmount,
      ],
      value
    })
  }
  , [writeContractAndWaitResult]);

  return {
    populateKandel,
    ...writeContractAndWaitResult
  }
}

export default usePopulateKandel;
