const resolvers = {
    Query: {
      async candle(root, { id }, { models }) {

        var foundedCandle = await models.Candle.findById(id).then(resp => {
            return resp
        })

        return foundedCandle
      },
      
      async allCandles(root, { ticker }, { models }) {

        var candles = await models.Candle.find({ticker}).then(resp => {
            return resp
        })

        return candles
      },
    },
  };
  
  module.exports = resolvers;