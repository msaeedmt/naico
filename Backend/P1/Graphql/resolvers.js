const resolvers = {
  Query: {
    async candle (root, { id }, { models }) {
      const foundedCandle = await models.Candle.findById(id).then(resp => {
        return resp
      })

      return foundedCandle
    },

    async allCandles (root, { ticker }, { models }) {
      const candles = await models.Candle.find({ ticker }).then(resp => {
        return resp
      })

      return candles
    }
  }
}

module.exports = resolvers
