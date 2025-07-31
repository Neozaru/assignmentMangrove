import { useCallback, useMemo } from 'react'
import useWriteContractAndWaitForTransactionReceipt from './useWriteContractAndWaitForTransactionReceipt'
import { kandelSeederABI } from '@/abi/kandelSeeder'
import { Address, decodeEventLog } from 'viem'
import { MarketParams } from '@mangrovedao/mgv'

type Props = {
  seederAddress: Address,
  market: MarketParams
}
const useCreateKandel = ({ seederAddress, market }: Props) => {
  const { writeContract, txReceipt } = useWriteContractAndWaitForTransactionReceipt()

  const createKandel = useCallback(() => {
    console.warn('Calling sow', { seederAddress, market })
    return writeContract({
      address: seederAddress,
      abi: kandelSeederABI,
      functionName: 'sow',
      args: [
        {
          outbound_tkn: market.base.address,
          inbound_tkn: market.quote.address,
          tickSpacing: market.tickSpacing
        },
        false
      ],
    })
  }, [seederAddress, market, writeContract])

  // Using tx receipt instead of Event Logs to find the newly created Kandel address.
  const newKandelAddress = useMemo(() => {
    if (txReceipt?.status === 'success') {
      const seederLog = txReceipt.logs.find(log => log.address.toLocaleLowerCase() === seederAddress.toLocaleLowerCase())
      if (!seederLog) {
        return
      }
      const decoded = decodeEventLog({
        abi: kandelSeederABI,
        data: seederLog.data,
        topics: seederLog.topics
      })
      return decoded?.args.kandel
    }
  }, [txReceipt, seederAddress])

  return {
    createKandel,
    newKandelAddress,
    txReceipt
  }
}

export default useCreateKandel
