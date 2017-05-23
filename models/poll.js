const mongoose = require("mongoose");

// Poll schema
const PollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  votes: {
    type: Array,
    required: true 
  },
  created_by: {
    type: String,
    required: true
  }
});

const Poll = module.exports = mongoose.model('Poll', PollSchema);

module.exports.getAll = function(callback){
  Poll.find({}, callback);
}

module.exports.addPoll = function(newPoll, callback){
  newPoll.save(callback);
}

module.exports.findPoll = function(id, callback){
  Poll.findOne({ _id: id }, callback);
}

module.exports.updatePoll = function(id, newPoll, callback){
  Poll.update({ _id: id }, newPoll, callback);
}