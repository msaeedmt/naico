const enums = require('../database/enums')

const resolvers = {
  Query: {

    async allDecisions (root, args, { models }) {
      const decisions = await models.Decision.find().populate('signal').then(resp => {
        return resp
      })

      return decisions
    },

    async allSignals (root, args, { models }) {
      const signals = await models.Signal.find().then(resp => {
        return resp
      })

      return signals
    },

    async getAnalysts (root, args, { models }) {
      const analystsTrueDecisions = await models.Decision.aggregate([
        {
          $lookup: {
            from: 'Signals',
            localField: 'signal',
            foreignField: '_id',
            as: 'signal'
          }
        },
        {
          $match: { 'signal.status': { $ne: enums.STATUS.OPEN } }
        },
        {
          $group: { _id: '$analyst', trueDecisions: { $sum: 1 } }
        }
      ])

      const analystsAllDecisions = await models.Decision.aggregate([
        {
          $group: { _id: '$analyst', allDecisions: { $sum: 1 } }
        }
      ])

      analystsAllDecisions.forEach(element => {
        element.trueDecisions = analystsTrueDecisions.find(x => x._id === element._id).trueDecisions
      })

      return analystsAllDecisions
    }
  }
}

module.exports = resolvers
