const mongoose = require('mongoose')
const enums = require('./enums')

const signalSchema = mongoose.Schema({
  signalNumber: { type: String },
  status: { type: Number, enum: enums.STATUS }
})

const decisionSchema = mongoose.Schema({
  analyst: { type: String },
  signal: { type: mongoose.Schema.Types.ObjectId, ref: 'Signal' },
  analystDecision: { type: Number, enum: enums.DECISION_TYPE }
})

const Signal = mongoose.model('Signal', signalSchema, 'Signals')
const Decision = mongoose.model('Decision', decisionSchema, 'Decisions')

const models = { Signal, Decision }

module.exports = models
