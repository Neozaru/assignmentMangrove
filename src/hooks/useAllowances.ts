import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'
import { Address } from 'viem'
import { useChainId } from '@/components/ChainIdProvider'

type AllowanceInput = {
  token: Address
  spender: Address
  owner: Address | undefined
}

type UseAllowancesParams = {
  allowances: AllowanceInput[]
  enabled?: boolean
}

export function useAllowances({ allowances, enabled = true }: UseAllowancesParams) {
  const { chainId } = useChainId()
  const contracts = allowances.map(({ token, owner, spender }) => ({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance' as const,
    args: [owner, spender] as const,
    chainId
  }))

  const isEnabled = enabled && contracts.every(c => c.args[0] && c.args[1] && c.address)

  const query = useReadContracts({
    contracts,
    query: { enabled: isEnabled },
  })

  const data = query.data?.map((entry, i) => ({
    ...allowances[i],
    value: entry.result as bigint | undefined,
  })) ?? []

  return {
    ...query,
    data,
  }
}
