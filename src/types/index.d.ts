import { Token } from '@mangrovedao/mgv';


type MarketParamsAndChainId = MarketParams & {
  chainId: number;
};

type KandelInfo = {
  address: `0x${string}`;
  baseToken: Token;
  quoteToken: Token;
  baseReserve: bigint;
  quoteReserve: bigint;
  tickSpacing: bigint;
  chainId: number;
  params: [number, number, number, number];
}

type Order = {
  index: bigint
  tick: bigint
  gives: bigint
  price: number
}
