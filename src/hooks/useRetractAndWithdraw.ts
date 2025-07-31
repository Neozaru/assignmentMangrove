import { useCallback } from 'react'
import kandelInstanceAbi from '@/abi/kandelInstance';
import useWriteContractAndWaitForTransactionReceipt from './useWriteContractAndWaitForTransactionReceipt';
import { Address } from 'viem';

type Props = {
  kandelAddress: Address,
  recipientAddress: Address | undefined
}

const UINT256_MAX = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

const useRetractAndWithdrawAll = ({ kandelAddress, recipientAddress }: Props) => {
  const { writeContract, txReceipt } = useWriteContractAndWaitForTransactionReceipt()

  const retractAndWithdrawAll = useCallback(() => {
    if (!recipientAddress) {
      console.error('No recipient address set')
      return
    }
    return writeContract({
      address: kandelAddress,
      abi: kandelInstanceAbi,
      functionName: 'retractAndWithdraw',
      args: [
        BigInt(0),
        BigInt(0),
        UINT256_MAX,
        UINT256_MAX,
        UINT256_MAX,
        recipientAddress
      ],
    })
  }, [kandelAddress, recipientAddress, writeContract])

  return {
    retractAndWithdrawAll,
    txReceipt
  }
}

export default useRetractAndWithdrawAll
