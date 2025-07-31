import { useReadContracts } from 'wagmi'
import kandelInstanceAbi from '@/abi/kandelInstance';
import { useMemo } from 'react';
import { useTokens } from './useTokens';
import omit from 'lodash/omit'
import { Address } from 'viem';

const contractCalls = [
  { functionName: 'BASE' },
  { functionName: 'QUOTE' },
  { functionName: 'TICK_SPACING' },
  { functionName: 'params' },
  { functionName: 'reserveBalance', args: [1] },
  { functionName: 'reserveBalance', args: [0] },
]

type Props = {
  kandelAddress: Address
  chainId: number
}
const useKandelInfo = ({ kandelAddress, chainId }: Props) => {
  const { data: kandelData, isLoading: isKandelDataLoading, isError } = useReadContracts({
    contracts: contractCalls.map(callConfig => ({
      address: kandelAddress,
      chainId,
      abi: kandelInstanceAbi,
      ...callConfig
    }))
  })

  const kandelInfo = useMemo(() => {
    if (isKandelDataLoading || isError || !kandelData) {
      return null
    }
    return {
      baseTokenAddress: kandelData[0].result as Address,
      quoteTokenAddress: kandelData[1].result as Address,
      tickSpacing: kandelData[2].result as bigint,
      params: kandelData[3].result as [number, number, number, number],
      baseReserve: kandelData[4].result as bigint,
      quoteReserve: kandelData[5].result as bigint
    }
  }, [kandelData, isKandelDataLoading, isError])

  const { data: tokens, isLoading: isTokenDataLoading } = useTokens({
    tokens: kandelInfo ? [{
      address: kandelInfo.baseTokenAddress,
      chainId,
    }, {
      address: kandelInfo.quoteTokenAddress,
      chainId,
    }] : [],
    enabled: !!kandelInfo
  })

  return useMemo(() => {
    if (isKandelDataLoading || isTokenDataLoading || !tokens) {
      return { isLoading: true }
    }
    
    return {
      data: {
        ...omit(kandelInfo, ['baseTokenAddress', 'quoteTokenAddress']),
        baseToken: tokens[0],
        quoteToken: tokens[1],
        address: kandelAddress,
        chainId
      },
      isLoading: false
    }
  }, [kandelInfo, tokens, isKandelDataLoading, isTokenDataLoading, kandelAddress, chainId])
}

export default useKandelInfo