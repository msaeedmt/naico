const mongoose = require("mongoose");
const enums = require("./enums")

var signalSchema = mongoose.Schema({
    signalNumber: {type: String},
    status: {type: Number, enum: enums.STATUS}
});

var decisionSchema = mongoose.Schema({
    analyst: {type: String},
    signal: {type: mongoose.Schema.Types.ObjectId, ref: "Signal"},
    analystDecision: {type: Number, enum: enums.DECISION_TYPE }
});

var Signal = mongoose.model('Signal', signalSchema, 'Signals');
var Decision = mongoose.model('Decision', decisionSchema, 'Decisions');


models = { Signal, Decision }

module.exports = models;
