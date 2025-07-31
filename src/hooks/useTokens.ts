import { useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'
import { Address } from 'viem'
import { buildToken, Token } from '@mangrovedao/mgv/addresses'

type TokenInput = {
  address: Address
  chainId: number
}

type UseTokensParams = {
  tokens: TokenInput[] | []
  enabled?: boolean
}

export function useTokens({ tokens = [], enabled = true }: UseTokensParams) {
  const contracts = useMemo(() => {
    return tokens.flatMap(({ address, chainId }) => [
      { address, abi: erc20Abi, chainId, functionName: 'symbol' },
      { address, abi: erc20Abi, chainId, functionName: 'name' },
      { address, abi: erc20Abi, chainId, functionName: 'decimals' },
    ])
  }, [tokens])

  const query = useReadContracts({
    contracts,
    query: { enabled },
  })

  console.warn('query?.data', query?.data)

  const data: Token[] = useMemo(() => {
    if (!query.data) {
      return tokens.map(({ address, chainId }) => ({
        address,
        chainId,
      }))
    }

    return tokens.map(({ address, chainId }, i) => {
      const base = i * 3
      return buildToken({
        address,
        chainId,
        symbol: query.data[base]?.result as string | undefined,
        name: query.data[base + 1]?.result as string | undefined,
        decimals: query.data[base + 2]?.result as number | undefined,
      })
    })
  }, [tokens, query.data])

  return {
    data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  }
}
