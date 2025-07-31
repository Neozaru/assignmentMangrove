// ChatGPT-generated. Excuse code repetition

import { Order } from '@/types';
import { MarketParams } from '@mangrovedao/mgv';
import React, { useCallback, useMemo } from 'react';
import { Address, formatUnits } from 'viem';

type Props = {
  market: MarketParams
  bids: Order[]
  asks: Order[]
  myAddress?: Address
  showMine?: boolean
}
const OrderbookView = ({ market, bids, asks, myAddress, showMine = false }: Props) => {
  const formatNumber = (num, decimals = 4) =>
    Number(num).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const processAsks = useCallback((orders) =>
    orders.filter(order => Number(order.gives) > 0).map(order => ({
      ...order,
      baseAmount: formatUnits(order.gives, market.base.decimals),
      totalQuoteAmount: Number(formatUnits(order.gives, market.base.decimals)) * Number(order.price),
      mine: showMine && myAddress && myAddress.toLocaleLowerCase() === order.maker.toLocaleLowerCase()
    })), [myAddress, market, showMine])

  const processBids = useCallback((orders) =>
    orders.filter(order => Number(order.gives) > 0).map(order => ({
      ...order,
      baseAmount: Number(formatUnits(order.gives, market.quote.decimals)) / Number(order.price),
      totalQuoteAmount: formatUnits(order.gives, market.quote.decimals),
      mine: showMine && myAddress && myAddress.toLocaleLowerCase() === order.maker.toLocaleLowerCase()
    })).sort((orderA, orderB) => orderB.price - orderA.price), [myAddress, market, showMine])

  const processedBids = useMemo(() => processBids(bids), [bids, processBids]);
  const processedAsks = useMemo(() => processAsks(asks), [asks, processAsks]);

  const midPrice = (processedAsks[0]?.price + processedBids[0]?.price) / 2
  const spread = useMemo(() => {
    if (!processedAsks?.length || !processedBids?.length) {
      return 0
    }
    const distanceBidAsk = processedAsks[0].price - processedBids[0].price
    return distanceBidAsk / midPrice
  }, [processedAsks, processedBids, midPrice])

  const colsClass = useMemo(() => showMine ? 'grid-cols-4' : 'grid-cols-4', [showMine])
  return (
    <div className="max-w-lg mx-auto p-4 text-sm">
      <div className={`grid ${colsClass} font-semibold border-b py-2`}>
        {showMine && <div className="text-left"></div>}
        <div className="text-left">Price ({market.quote.symbol})</div>
        <div className="text-center">Amount ({market.base.symbol})</div>
        <div className="text-right">Total ({market.quote.symbol})</div>
      </div>

      {/* Asks */}
      <div className="text-red-500">
        {processedAsks.slice().reverse().map((ask, idx) => (
          <div key={idx} className={`grid ${colsClass} py-1`}>
            {showMine && <div className="text-center">{ask.mine ? '👉' : ''}</div>}
            <div className="text-left">{formatNumber(ask.price)}</div>
            <div className="text-center">{formatNumber(ask.baseAmount, 4)}</div>
            <div className="text-right">{formatNumber(ask.totalQuoteAmount)}</div>
          </div>
        ))}
      </div>

      {/* Mid-price separator */}
      <div className="border-t border-b py-1 my-2 text-center">
        {processedAsks.length === 0 && processedBids.length === 0 
        ? <span>Orderbook is empty ¯\_(ツ)_/¯</span>
        : <span>Mid Price ≈ {formatNumber(midPrice)} (Spread: {(spread * 100).toFixed(2)}%)</span>}
      </div>

      {/* Bids */}
      <div className="text-green-500">
        {processedBids.map((bid, idx) => (
          <div key={idx} className={`grid ${colsClass} py-1`}>
            {showMine && <div className="text-center">{bid.mine ? '👉' : ''}</div>}
            <div className="text-left">{formatNumber(bid.price)}</div>
            <div className="text-center">{formatNumber(bid.baseAmount, 4)}</div>
            <div className="text-right">{formatNumber(bid.totalQuoteAmount)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderbookView;
