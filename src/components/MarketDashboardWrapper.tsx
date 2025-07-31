import { useTokens } from '@/hooks/useTokens'
import MarketDashboard from './MarketDashboard'
import { useMemo } from 'react'
import { MarketParamsAndChainId } from '@/types'

type Props = {
  marketProps: MarketParamsAndChainId
}
const MarketDashboardWrapper = ({ marketProps }: Props) => {
  const { data: tokens, isLoading: isTokenDataLoading } = useTokens({
    tokens: [{
      address: marketProps.baseTokenAddress,
      chainId: marketProps.chainId,
    }, {
      address: marketProps.quoteTokenAddress,
      chainId: marketProps.chainId,
    }],
    enabled: !!marketProps
  })

  const market = useMemo(() => {
    if (!marketProps || isTokenDataLoading || !tokens) {
      return null
    }

    return {
        base: tokens?.[0],
        quote: tokens?.[1],
        tickSpacing: marketProps.tickSpacing,
        chainId: marketProps.chainId,
      }
  }, [marketProps, isTokenDataLoading, tokens])

  return (<div>
    {market && <MarketDashboard market={market} />}
  </div>)

}

export default MarketDashboardWrapper