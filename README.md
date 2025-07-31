# Kandel LP UI

UI: http://neozaru.ovh:3000/

1. **Your Understanding:** A summary of how you understand the Mangrove core engine (offers, provisions) and Kandel's strategy (how it moves liquidity, reprovisions offers, and generates returns).
2. **APR Calculation Proposal:** Propose a method to calculate an indicative APR for a Kandel position. This calculation should be based on the **generated spread in terms of the tokens**, not on an absolute USD value. Think about how to track the change in inventory over time to represent earnings.

# UNDERSTANDING

### Mangrove

- Mangrove is an Orderbook-based DEX, where posted orders are code. That is, when a maker posts an offer, it publishes behavior, and when that order is "taken" or "filled", that behavior is executed. This allows full expressivity because any code or smart-contract can be executed as long as the order is filled.
- Makers need to include a provision with each order. This provision is used in case the posted order can't be fullfilled or executed anymore. It aligns incentives between the "maker" that doesn't want to lose his provision (he loses it if orders fail to deliver), the orgnanic "taker" that doesn't want to have wasted gas (he gets reimbursed with the provision in case of failing taking an order) and the "cleaners" that will be actively detect whetever an order becomes "unfillable" and "try to fill it" on purpose to get the compensation (free ETH!).

### Kandel

- Kandel is one of the possible strategies for Mangrove and is made available publicly in the form of a factory contract. The goal of Kandle is to emulate traditional market-makers and AMMs, and create a "relatively passive" way to provide liquidity. Is allows to set-up buy and sell orders on both side of a price. Everytime one of those orders is filled, an "opposite order" (dual offer) is created in such a way that if such an offer is filled too, a profit will have been made (buy x, sell x+1). The elegant part of Kandel is that the orderbook "lives by itself" because each "fill" executes the code that will post the next order (dual offer). Kandel uses a notion of "tick" similar to Uniswap V3, where "not all prices exist", but instead only specific values separated by "tickSize".

### Indicative APY calculation

- Kandel allows defining the positions of the orders in the orderbook, along with the distance between the next filled order and its newly created "dual offer". This allows to define a "spread" (% difference between the best bid and the best ask). Assuming we know the volume of the market, and assuming we know our market share as a market maker, the formula could be similar to : `(<volume_per_day> x <spread> x <market_share> x 365) / <total_deployed_capital>`. Inventory changes and price fluctuations of underlying tokens would be useful for statistical and actual APRs, which could be computed a-posteriori by comparing the `(reserves(t+1) - reserves(t)) / reserves(t)`.

## CHOICES / COMPROMISES
- The UI in general is ugly. I tried to make the UX decent in the "Kandel setup modal" in the sense of avoid user to go through a process that would fail (checking minimum amounts, etc...). I centered the UX around the "CTA" in the same way as Uniswap: The CTA button tells you what to do next / what's wrong. In production obviously, error messages, red fields, etc... will be required.
- With multiple parameters, there were multiple possible approaches for letting an user configure their Kandel (range + num orders + total, range + num orders + amount per order, center price + number of orders + total, etc...). It was choosen to let the user define price range, amount per order and desired amount of order, while letting the UI display "what will actually happen". This may be a good middle ground for market makers that have at least at approximate mental model for how Kandel works. Targetting more "retail" users, it could be a good idea to have a more "UniswapV3-like" UI where the user chooses the total amount to deposit on each side rather than num_orders+amount_per_order. However, with the per-order minimal amount requirement, it is more complicated to abstract the notion of "more orders == less amount per order == more overhead". A good retail-proof UI would probably define a default "sweet spot", letting user choose price range and total amount and automatically choosing the underlying number of orders. If I had more time I would have developed such an interface, maybe making the current one an "advanced mode". However this really depends on what the target audience is. Also there might be other ways to do this that I didn't think about. There seems to be plenty of room for experimentation with Kandels in general.


## LIMITATIONS

- No error management or recovery.
- The code could deserve some refactoring. For example user actions management and CTAs are sometimes similar in muliple flows: Connect Wallet, Approve token A, approve token B, THEN do stuff. This flow is explicity "repeated" in multiple components. A quick refactoring would affect code readability, while a more elegant refactoring would have taken more time and thinking than I had. The chosen compromise what to at least separate logic in their own reusable functions and hooks. 
- Chose a fixed 4-decimals representation for prices regardless of token so it would be compatible with broader range of token. Make price display ugly for some tokens. In a production environment, each token could have specific "fixed" decimals for price and amount.
- Some quick hooks / components were generated by ChatGPT when I found they were not relevant to the "test". They are usually indicated although I might have forgotten to point out one or two.
- I used localStorage to "remember" Kandles as I couldn't find any other way. A future version could scan blockchain events (after user connects), or simply let user as their Kandel manually (a la Uniswap with their positions).
- Typescript typings: A production app would have everything perfectly typed. However for this test, I found relevant to do most of the typing but omit the ones that would take more time or force to change the code logic. This also means the URL points to a dev environment and not a production one.
- Doesn't support errors when Metamask is auto-locks during flow.

IDEAS
- Optional "around current price" option when creating a Kandel position. This depends on who is the audience of the UI. Retail user will most likely want a single Kandel strategy around current price with time horizon of a few days/weeks.



# Original README

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


