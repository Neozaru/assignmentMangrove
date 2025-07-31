import { createContext, ReactNode, useContext } from 'react';

export const ChainIdContext = createContext({
  chainId: 0,
})

type Props = {
  chainId: number,
  children: ReactNode
}

export const ChainIdProvider = ({ chainId, children }: Props) => {
  return (<ChainIdContext.Provider value={{ chainId }}>
    {children}
  </ChainIdContext.Provider>)
}

export const useChainId = () => useContext(ChainIdContext)
