import { createGeometricDistribution, MarketParams, tickFromPrice } from '@mangrovedao/mgv'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { formatUnits, parseUnits } from 'viem'
import map from 'lodash/map'
import OrderbookView from './OrderbookView'
import CtaButton from './CtaButton'
import { useAccount, useReadContract } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useUserBalancesForPair from '@/hooks/useUserBalancesForPair'
import useMarketConfig from '@/hooks/useMarketConfig'
import { useAllowances } from '@/hooks/useAllowances'
import { useApprove } from '@/hooks/useApprove'
import { readerAbi } from '@/abi/reader'
import usePopulateKandel from '@/hooks/usePopulateKandel'
import ModalWrapper from './ModalWrapper'
import AmountInputWithBalance from './AmountInputWithBalance'
import { parseDensity } from '@mangrovedao/mgv/lib'
import assignmentConfig from '@/assignment.config'
import { KandelInfo, Order } from '@/types'

type KandelConfig = {
  active: boolean;
  binPosInLeaf: bigint;
  density: bigint;
  fee: bigint;
  kilo_offer_gasbase: bigint;
  last: bigint;
  level1: bigint;
  level2: bigint;
  level3: bigint;
  lock: boolean;
  root: bigint;
};

const sumBigInt = (arr: bigint[]) =>
  arr.reduce((acc, item) => acc + BigInt(item), BigInt(0))

const calculateMinimumDeposit = ({ bids, asks }: { bids: Order[], asks: Order[]}) => {
  return {
    requiredAmountBaseToken: sumBigInt(map(asks, 'gives')),
    requiredAmountQuoteToken: sumBigInt(map(bids, 'gives'))
  }
}

const ceilBN = (n: bigint, d: bigint) => n / d + (n % d ? BigInt(1) : BigInt(0))

function subClamp(a: bigint, b: bigint): bigint {
  const diff = a - b;
  const zero = BigInt(0);
  return diff > zero ? diff : zero;
}

// LIMITATION: Hardcoding the step size to 1 to limit form size. TODO: Maybe we want it anyways.
const STEP_SIZE = 1

const GAS_REQ_PARAM_INDEX = 1

type Props = {
  kandel: KandelInfo,
  market: MarketParams
  onClose: () => void
}

const KandelSetupModal = ({ kandel, market, onClose }: Props) => {
  const kandelGasReq = useMemo(() => kandel.params[GAS_REQ_PARAM_INDEX], [kandel])

  const priceAdjustBaseQuote = useCallback((price: number) => {
    return price / Math.pow(10, market.base.decimals - market.quote.decimals)
  }, [market])

  const [minPrice, setMinPrice] = useState('3700')
  const [maxPrice, setMaxPrice] = useState('3900')
  const [numOrders, setNumOrders] = useState('10')
  // const [stepSize, setStepSize] = useState('1')
  const [amountPerOrderBaseCurrency, setAmountPerOrderBaseCurrency] = useState('0.0068')

  const { address: connectedWalletAddress, status: walletConnectionStatus } = useAccount()
  const { openConnectModal } = useConnectModal()

  const distributionParams = useMemo(() => {
    const errors: string[] = []

    const min = parseFloat(minPrice)
    const max = parseFloat(maxPrice)
    const numOrdersValue = parseInt(numOrders)
    const amountPerBaseCurrencyValue = parseFloat(amountPerOrderBaseCurrency)
    const amountPerBaseCurrencyNative = parseUnits(amountPerOrderBaseCurrency, market.base.decimals)

    if (isNaN(min) || min <= 0) errors.push('Min price must be a positive number.')
    if (isNaN(max) || max <= 0) errors.push('Max price must be a positive number.')
    if (!isNaN(min) && !isNaN(max) && max <= min) errors.push('Max price must be greater than min price.')
    if (!numOrdersValue) errors.push('Set the number of orders')
    if (!amountPerBaseCurrencyValue) errors.push('Set the amount per order')

    const valid = errors.length === 0

    if (!valid) {
      return null
    }

    // Beggining of OB
    const minPriceTick = tickFromPrice(priceAdjustBaseQuote(min), market.tickSpacing)

    // End of OB
    const maxPriceTick = tickFromPrice(priceAdjustBaseQuote(max), market.tickSpacing)


    // LIMITATION: User selects an approximate number of orders but not the actual number of orders
    // const idealOffset = (maxPriceTick - minPriceTick) / BigInt(2)

    // Fixed value for a given price range.
    const maxPricePoints = (maxPriceTick - minPriceTick)
    if (numOrdersValue > maxPricePoints) {
      return null
    }
        // How much to "space-out" orders. We find an approximation based on desired number of orders.
    const offset = BigInt(Math.ceil(Number(maxPricePoints) / numOrdersValue))

    const pricePoints = ceilBN(maxPricePoints, offset)

    // Middle of the OB (pricePoint index)
    const firstAskIndex = BigInt(Math.ceil(Number(pricePoints) / 2))
  
    const stepSize = BigInt(STEP_SIZE)

    const geoDistribParams = {
      market,
      baseQuoteTickIndex0: minPriceTick,
      baseQuoteTickOffset: offset,
      firstAskIndex,
      pricePoints,
      stepSize,
      askGives: amountPerBaseCurrencyNative,
    }

    const distribution = createGeometricDistribution(geoDistribParams)

    const { requiredAmountBaseToken, requiredAmountQuoteToken } = calculateMinimumDeposit(distribution)

    // Taking in account what is already in the reserve
    const amountBaseTokenToInclude = subClamp(requiredAmountBaseToken, kandel.baseReserve)
    const amountQuoteTokenToInclude = subClamp(requiredAmountQuoteToken, kandel.quoteReserve)

    const params = {
      kandelAddress: kandel.address,
      bids: distribution.bids,
      asks: distribution.asks,
      baseAmount: amountBaseTokenToInclude,
      quoteAmount: amountQuoteTokenToInclude,
      meta: {
        gasprice: 0,
        gasreq: kandelGasReq,
        stepSize,
        pricePoints
      }
    }
    return params
  }, [kandel, minPrice, maxPrice, priceAdjustBaseQuote, market, amountPerOrderBaseCurrency, numOrders, kandelGasReq])

  const userBalances = useUserBalancesForPair({
    baseTokenAddress: market.base.address,
    quoteTokenAddress: market.quote.address,
    userAddress: connectedWalletAddress
  })

  const { data: marketConfig, isLoading: isLoadingMarketConfig } = useMarketConfig(market)

  function computeMinimumAmountPerOrder(config: KandelConfig, gasReq: number) {
    const gasBase = config.kilo_offer_gasbase * BigInt(1000)
    const parsedDensity = parseDensity(config.density)
    return (Number(gasBase) + gasReq) * parsedDensity
  }

  const [minBaseAmountPerOrder, minQuoteAmountPerOrder] = useMemo(() => {
    if (!marketConfig) {
      return [BigInt(0), BigInt(0)]
    }
    return [
      computeMinimumAmountPerOrder(marketConfig.config01, kandelGasReq),
      computeMinimumAmountPerOrder(marketConfig.config10, kandelGasReq)
    ]
  }, [marketConfig, kandelGasReq])

  const { data: allowances, refetch: refetchApproval } = useAllowances({
    allowances: [
      { token: market.base.address, owner: connectedWalletAddress, spender: kandel.address },
      { token: market.quote.address, owner: connectedWalletAddress, spender: kandel.address }
    ],
    enabled: !!connectedWalletAddress && !!market
  })



  const { data: provisionEstimate } = useReadContract({
    address: assignmentConfig.mgvReaderAddress,
    abi: readerAbi,
    functionName: 'getProvisionWithDefaultGasPrice',
    args: [{
      outbound_tkn: market.base.address,
      inbound_tkn: market.quote.address,
      tickSpacing: market.tickSpacing
    },
    BigInt(kandelGasReq), // No extra gasreq for simplicity
    ]
  })

  const totalWeiValueForTransaction = useMemo(() => {
    if (!provisionEstimate || !distributionParams) {
      return BigInt(0)
    }
    const totalProvisionWei = BigInt(distributionParams.asks.length + distributionParams.bids.length) * provisionEstimate
    return totalProvisionWei
  }, [provisionEstimate, distributionParams])

  const { populateKandel, txReceipt: populateKandelTxReceipt, isTxPendingConfirmation: isPendingPopulateTx, isTxSignaturePending: isPendingPopulateSignature } = usePopulateKandel()

  const { approve: approve, txReceipt: approvalTxReceipt, isTxPendingConfirmation: isPendingApprovalTx, isTxSignaturePending: isPendingApprovalSignature } = useApprove()

  const smallestQuoteGives = useMemo(() => {
    if (!distributionParams) {
      return null
    }
    return distributionParams.bids?.[0]?.gives
  }, [distributionParams])

  const cta = useMemo(() => {
    if (isPendingApprovalSignature || isPendingPopulateSignature) {
      return { text: 'Confirm Transaction In Wallet' }
    }

    if (isPendingApprovalTx || isPendingPopulateTx) {
      return { text: 'Sending Transaction...' }
    }

    if (walletConnectionStatus === 'connecting' || walletConnectionStatus === 'reconnecting' || isLoadingMarketConfig || !allowances) {
      return { text: 'Loading...' }
    }
    // Generic form errors
    if (!distributionParams) {
      return { text: 'Fix form errors' }
    }

    if (minBaseAmountPerOrder && (minBaseAmountPerOrder > parseUnits(amountPerOrderBaseCurrency, market.base.decimals))) {
      return { text: `Unsufficient ${market.base.symbol} amount per order` }
    }

    if (minQuoteAmountPerOrder && !!smallestQuoteGives && (minQuoteAmountPerOrder > smallestQuoteGives)) {
      return { text: `Unsufficient ${market.quote.symbol} amount per order` }
    }

    if (userBalances?.baseTokenBalance && userBalances.baseTokenBalance.value < distributionParams.baseAmount) {
      return { text: `Unsufficient ${market.base.symbol} balance` }
    }

    if (userBalances?.quoteTokenBalance && userBalances.quoteTokenBalance.value < distributionParams.quoteAmount) {
      return { text: `Unsufficient ${market.quote.symbol} balance` }
    }

    if (!connectedWalletAddress) {
      return {
        text: 'Connect wallet',
        callback: openConnectModal
      }
    }

    const amountsWei = [distributionParams.baseAmount, distributionParams.quoteAmount]

    // LIMITATION: Could be refactored with similar logic to DepositModal
    for (let i = 0; i < 2; i++) {
      const allowance = allowances?.[i];
      const needed = amountsWei[i];

      if (allowance?.value && needed > allowance.value) {
        const token = i === 0 ? market.base : market.quote;
        return {
          text: `Approve ${token.symbol}`,
          callback: () =>
            approve({
              tokenAddress: token.address,
              spender: kandel.address,
              amount: amountsWei[i]
            })
        };
      }
    }

    return {
      text: 'Populate Strategy',
      callback: () => populateKandel({
        value: totalWeiValueForTransaction,
        ...distributionParams
      })
    }
  }, [market, populateKandel, kandel, distributionParams, minBaseAmountPerOrder,
    amountPerOrderBaseCurrency, userBalances, isLoadingMarketConfig, connectedWalletAddress,
    walletConnectionStatus, openConnectModal, allowances, totalWeiValueForTransaction, approve,
    isPendingApprovalSignature, isPendingApprovalTx, isPendingPopulateSignature, isPendingPopulateTx, minQuoteAmountPerOrder, smallestQuoteGives])

  useEffect(() => {
    if (approvalTxReceipt?.status === 'success') {
      refetchApproval()
    }
  }, [approvalTxReceipt, refetchApproval])

  useEffect(() => {
    if (populateKandelTxReceipt?.status === 'success') {
      onClose()
    }
  }, [populateKandelTxReceipt, onClose])

  const allOrders = useMemo(() => (distributionParams ? [...distributionParams.bids, ...distributionParams.asks] : []), [distributionParams])

  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4 bg-white rounded-xl shadow space-y-4 flex flex-row">
        <div className="w-md">
          <h2 className="text-xl font-semibold mb-4">Kandel Params</h2>

          <Input label="Min Price" value={minPrice} setValue={setMinPrice} type="number" />
          <Input label="Max Price" value={maxPrice} setValue={setMaxPrice} type="number" />
          <Input label="Number of orders (max)" value={numOrders} setValue={setNumOrders} type="number" />
          <Input label={`${market.base.symbol} per order ${minBaseAmountPerOrder && `(>= ${formatUnits(minBaseAmountPerOrder, market.base.decimals).slice(0, 10)} ${market.base.symbol} / >= ${formatUnits(minQuoteAmountPerOrder, market.quote.decimals).slice(0, 10)} ${market.quote.symbol})`}`} value={amountPerOrderBaseCurrency} setValue={setAmountPerOrderBaseCurrency} type="number" />

          {
            distributionParams && <div className='mt-4'>
              <h2 className='text-xl pb-2'>Will deposit:</h2>
              <AmountInputWithBalance
                amount={formatUnits(distributionParams.baseAmount, market.base.decimals)}
                balance={userBalances?.baseTokenBalance.formatted}
                symbol={market.base.symbol}
                disabled={true}
              />
              <AmountInputWithBalance
                amount={formatUnits(distributionParams.quoteAmount, market.quote.decimals)}
                balance={userBalances?.quoteTokenBalance.formatted}
                symbol={market.quote.symbol}
                disabled={true}
              />
              <AmountInputWithBalance
                amount={formatUnits(totalWeiValueForTransaction || BigInt(0), 18)}
                balance={userBalances?.ethBalance.formatted}
                symbol={'ETH gas provisions'} // Assuming ETH here. Wont work well for xDai / gnosis
                disabled={true}
              />
            </div>
          }
          <CtaButton text={cta.text} callback={cta.callback} />
        </div>
        {
          distributionParams && <div className='max-h-160 overflow-y-scroll'>
            <div className='text-center'>{allOrders.filter(o => o.gives > 0).length} non-0 orders ({allOrders.length} total)</div>
            <OrderbookView market={market} asks={distributionParams.asks} bids={distributionParams.bids} />
          </div>
        }
      </div>
    </ModalWrapper>
  )
}

function Input({ label, value, setValue, type = 'text' }: {
  label: string,
  value: string,
  setValue: (val: string) => void,
  type?: string
}) {
  return (
    <div className="space-y-1 pb-3">
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input border rounded px-3 py-1 w-full"
      />
    </div>
  )
}

export default KandelSetupModal
