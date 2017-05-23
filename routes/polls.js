const express = require("express");
const router = express.Router();
const Poll = require("../models/poll");

router.get("/polls", (req, res) => {
  Poll.getAll((err, polls) => {
    if(err){
      res.json({success: false, msg: "Failed to get polls"});
    }else{
      let _polls = [];
      polls.forEach((poll, i) => {
        let votes = [];
        
        for(let j = 0; j < poll.options.length; j++){
          if(poll.votes[j]){
            votes.push(poll.votes[j].length);
          }else{
            votes.push(0);
          }
        }

        poll.votes = votes;
        _polls.push(poll);
      });
      res.json({success: true, msg: "Polls retrieved", polls: _polls});
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

router.put("/poll", (req, res) => {
  let id = req.body.id;
  let option = req.body.option;

  Poll.findPoll(id, (err, poll) => {
    if(err) res.json({success: false, msg: "Error"});

    let index = poll.options.indexOf(option);
    if(index < 0) res.json({success: false, msg: "Error"});

    poll.votes[index].push("TEST");

    Poll.updatePoll(id, poll, (err, poll) => {
      if(err) res.json({success: false, msg: "Error"});

      // Not DRY!!
      Poll.getAll((err, polls) => {
        if(err){
          res.json({success: false, msg: "Failed to get polls"});
        }else{
          let _polls = [];
          polls.forEach((poll, i) => {
            let votes = [];
            
            for(let j = 0; j < poll.options.length; j++){
              if(poll.votes[j]){
                votes.push(poll.votes[j].length);
              }else{
                votes.push(0);
              }
            }

            poll.votes = votes;
            _polls.push(poll);
          });
          res.json({success: true, msg: "Poll updated", polls: _polls, poll: poll});
        }
      });

    });
  });

});


module.exports = router;