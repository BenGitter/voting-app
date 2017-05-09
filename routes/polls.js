const express = require("express");
const router = express.Router();
const Poll = require("../models/poll");

router.get("/polls", (req, res) => {
  Poll.getAll((err, polls) => {
    if(err){
      res.json({success: false, msg: "Failed to get polls"});
    }else{
      res.json({success: true, msg: "Polls retrieved", polls: polls});
    }
  });
});

router.post("/poll", (req, res) => {
  let newPoll = new Poll({
    name: req.body.name,
    options: req.body.options,
    votes: req.body.votes,
    created_by: req.body.created_by
  });

  Poll.addPoll(newPoll, (err, poll) => {
    if(err){
      console.log(err);
      res.json({success: false, msg: "Failed to add poll"});
    }else{
      res.json({success: true, msg: "Poll added"});
    }
  });
});


module.exports = router;