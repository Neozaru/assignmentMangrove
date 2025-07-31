import { Address, erc20Abi } from 'viem'

import { useCallback } from 'react';
import useWriteContractAndWaitForTransactionReceipt from './useWriteContractAndWaitForTransactionReceipt';

type Props = {
  tokenAddress: Address,
  spender: Address,
  amount: bigint
}

export function useApprove() {
  const useWriteContractAndWaitResult = useWriteContractAndWaitForTransactionReceipt()
  
  const approve = useCallback(({ tokenAddress, spender, amount }: Props) => {
    return useWriteContractAndWaitResult?.writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, amount],
    })
  }, [useWriteContractAndWaitResult])

  return {
    approve,
    ...useWriteContractAndWaitResult
  }
}
