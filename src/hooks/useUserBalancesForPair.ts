// Limitations:
// - Could have done a useReadContracts to do one request

import { useChainId } from '@/components/ChainIdProvider'
import { useMemo } from 'react'
import { Address } from 'viem'
import { useBalance } from 'wagmi'

type Props = {
  baseTokenAddress: Address,
  quoteTokenAddress: Address,
  userAddress: Address | undefined,
}

const useUserBalancesForPair = ({ baseTokenAddress, quoteTokenAddress, userAddress }: Props) => {
  const { chainId } = useChainId()

  const { data: baseTokenBalanceData } = useBalance({
    address: userAddress,
    token: baseTokenAddress,
    chainId
  })

  const { data: quoteTokenBalanceData } = useBalance({
    address: userAddress,
    token: quoteTokenAddress,
    chainId
  })

  // ETH
  const { data: ethBalanceData } = useBalance({
    address: userAddress,
    chainId
  })

  return useMemo(() => {
    if (!baseTokenBalanceData || !quoteTokenBalanceData || !ethBalanceData) {
      return null
    }
    return {
      baseTokenBalance: baseTokenBalanceData,
      quoteTokenBalance: quoteTokenBalanceData,
      ethBalance: ethBalanceData
    }
  }, [baseTokenBalanceData, quoteTokenBalanceData, ethBalanceData])

}

export default useUserBalancesForPair
