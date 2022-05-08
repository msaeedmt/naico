# naico

## backend P1
npm run seed -> seeding the database from binance daily BTCUSDT candles <br/>
npm start -> running the graphql server <br/>
npm run seedAndStart -> seed the database and run the graphql server <br/>

Queries: <br/>
{<br/>
  &emsp; allCandles(ticker: String!) -> for getting the seeded data set ticker to "BTCUSDT" <br/>
  &emsp; candle(id: String!) -> id parameter is the saved candle database id <br/>
}

## backend p2
npm test -> running the unit tests <br/>
npm run seed -> seeding the database from binance daily BTCUSDT candles <br/>
npm start -> running the graphql server <br/>
npm run seedAndStart -> seed the database and run the graphql server <br/>

Queries: <br/>
{<br/>
  &emsp; allDecisions() -> getting all decisions with populated signals <br/>
  &emsp; allSignals() -> getting all signals <br/>
  &emsp; getAnalysts() -> getting unique analyst usernames with their number of all decisions and true dicisions <br/>
}
