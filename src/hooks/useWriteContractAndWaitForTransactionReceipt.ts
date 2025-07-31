import { useChainId } from '@/components/ChainIdProvider'
import { useCallback } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const useWriteContractAndWaitForTransactionReceipt = () => {
  const { chainId } = useChainId()
  const { data: txHash, isPending: isTxSignaturePending, error: txSignatureError, writeContract } = useWriteContract()
  const { isLoading: isTxPendingConfirmation, data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash: txHash,
    confirmations: 3
  })

  const writeContractWithContextChainId = useCallback((config: Parameters<typeof writeContract>[0]) => writeContract({
    ...config,
    chainId
  }), [writeContract, chainId])

  const error = txSignatureError || txError

  return {
    writeContract: writeContractWithContextChainId,
    isTxSignaturePending,
    isTxPendingConfirmation,
    txHash,
    txReceipt,
    error
  }
}

export default useWriteContractAndWaitForTransactionReceipt
