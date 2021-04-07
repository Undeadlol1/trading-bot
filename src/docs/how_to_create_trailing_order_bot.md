1. create TrailingOrderBot entity and table

```ts
export type TrailingOrderBot {
  id
  orders
  symbol;
  amount;
  createdAt
  updatedAt
  minimumBuyAt;
  maximumSellAt;
  trailingUnits;
}
```

2. Create CreateTrailingOrder use case and repository
3. Create TrailingOrderBotRunner
