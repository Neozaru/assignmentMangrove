import { useCallback } from 'react'
import useWriteContractAndWaitForTransactionReceipt from './useWriteContractAndWaitForTransactionReceipt'
import { Address } from 'viem'
import kandelInstanceAbi from '@/abi/kandelInstance';
import { base } from 'viem/chains';

type Props = {
  kandelAddress: Address,
  baseAmount: bigint,
  quoteAmount: bigint,
}

const useDepositLiquidity = () => {
  const { writeContract, txReceipt } = useWriteContractAndWaitForTransactionReceipt()

  const depositLiquidity = useCallback(({ kandelAddress, baseAmount, quoteAmount }: Props) => {
    return writeContract({
      chainId: base.id,
      abi: kandelInstanceAbi,
      functionName: 'depositFunds',
      address: kandelAddress,
      args: [
        baseAmount,
        quoteAmount
      ]
    })
  }, [writeContract])

  return {
    depositLiquidity,
    txReceipt
  }
}

export default useDepositLiquidity
