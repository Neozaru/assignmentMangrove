import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import CtaButton from './CtaButton'
import useUserBalancesForPair from '@/hooks/useUserBalancesForPair'
import ModalWrapper from './ModalWrapper'
import { useAllowances } from '@/hooks/useAllowances'
import useDepositLiquidity from '@/hooks/useDepositLiquidity'
import { useApprove } from '@/hooks/useApprove'
import { Address, parseUnits } from 'viem'
import { MarketParams } from '@mangrovedao/mgv'
import AmountInputWithBalance from './AmountInputWithBalance'

enum BaseQuoteIndex {
  BASE = 0,
  QUOTE = 1
}

type Props = {
  kandelAddress: Address,
  market: MarketParams,
  onClose: () => void
}

const DepositModal = ({ kandelAddress, market, onClose }: Props) => {
  const { openConnectModal } = useConnectModal()

  const [baseAmount, setBaseAmount] = useState('')
  const [quoteAmount, setQuoteAmount] = useState('')

  const { address: connectedWalletAddress } = useAccount()

  const userBalances = useUserBalancesForPair({
    baseTokenAddress: market.base.address,
    quoteTokenAddress: market.quote.address,
    userAddress: connectedWalletAddress
  })

  const { data: allowances, refetch: refetchAllowances } = useAllowances({
    allowances: [
      { token: market.base.address, owner: connectedWalletAddress, spender: kandelAddress },
      { token: market.quote.address, owner: connectedWalletAddress, spender: kandelAddress }
    ],
    enabled: !!connectedWalletAddress && !!kandelAddress && !!market
  })

  const { approve, txReceipt: approvalTxReceipt } = useApprove()

  const { depositLiquidity, txReceipt: depositTxReceipt } = useDepositLiquidity()

  const amountsWei = useMemo(() => [
    parseUnits(baseAmount, market.base.decimals),
    parseUnits(quoteAmount, market.quote.decimals),
  ],
  [baseAmount, quoteAmount, market])

  const cta = useMemo(() => {
    if (!connectedWalletAddress) {
      return {
        text: 'Connect wallet',
        callback: openConnectModal
      }
    }
    if ((!baseAmount || baseAmount === '0') && (!quoteAmount || quoteAmount === '0')) {
      return { text: 'Enter amount' }
    }

    if (userBalances?.baseTokenBalance && userBalances.baseTokenBalance.value < amountsWei[BaseQuoteIndex.BASE]) {
      return { text: `Unsufficient ${market.base.symbol} balance` }
    }

    if (userBalances?.quoteTokenBalance && userBalances.quoteTokenBalance.value < amountsWei[BaseQuoteIndex.QUOTE]) {
      return { text: `Unsufficient ${market.quote.symbol} balance` }
    }

    for (let i = 0; i < 2; i++) {
      const allowance = allowances?.[i];
      const needed = amountsWei[i];

      // LIMITATION: Could be refactored with similar logic to KandelSetupModal
      if (allowance?.value && needed > allowance.value) {
        const token = i === BaseQuoteIndex.BASE ? market.base : market.quote;
        return {
          text: `Approve ${token.symbol}`,
          callback: () =>
            approve({
              tokenAddress: token.address,
              spender: kandelAddress,
              amount: amountsWei[i]
            })
        };
      }
    }

    return {
      text: 'Deposit Liquidity',
      callback: () => depositLiquidity({
        kandelAddress,
        baseAmount: parseUnits(baseAmount, market.base.decimals),
        quoteAmount: parseUnits(quoteAmount, market.quote.decimals)
      })
    }
  }, [userBalances, connectedWalletAddress, market, amountsWei, baseAmount, allowances, approve, depositLiquidity, kandelAddress, quoteAmount, openConnectModal])

  useEffect(() => {
    if (depositTxReceipt?.status === 'success') {
      onClose()
    }
  }, [depositTxReceipt, onClose])

  useEffect(() => {
    if (approvalTxReceipt?.status === 'success') {
      refetchAllowances()
    }
  }, [approvalTxReceipt, refetchAllowances, onClose])

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Deposit Reserves</h2>
      <AmountInputWithBalance
        amount={baseAmount}
        balance={userBalances?.baseTokenBalance.formatted}
        symbol={market.base.symbol}
        onChange={setBaseAmount}
      />

      <AmountInputWithBalance
        amount={quoteAmount}
        balance={userBalances?.quoteTokenBalance.formatted}
        symbol={market.quote.symbol}
        onChange={setQuoteAmount}
      />
      {cta && <CtaButton text={cta.text} callback={cta.callback} />}
    </ModalWrapper>
  )

}

export default DepositModal
