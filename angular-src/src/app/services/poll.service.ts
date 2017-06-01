import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Poll } from '../poll';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class PollService {
  pollsAvailable = false;
  polls:Array<any> = [];
  pollPromise:any;

  constructor(
    private http:Http,
    private flashMessage:FlashMessagesService
  ) {
    this.pollPromise = this.getPolls().publishReplay().refCount(); 
    this.pollPromise.subscribe(data => {
      this.polls = data.polls;
      this.pollsAvailable = true;

      console.log(this.polls);
    });
  }

  deletePoll(id){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.delete("/api/poll/"+id, {headers:headers})
      .map(res => res.json());
  }

  postPoll(poll){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post("/api/poll", poll, {headers:headers})
      .map(res => res.json());
  }

  getPolls(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/polls", {headers:headers})
      .map(res => res.json());
  }

  getPoll(id){
    let self = this;

    return new Promise<Poll>(
      function(resolve, reject){
        if(self.pollsAvailable){
          self.polls.forEach((poll, i) => {
            if(poll._id == id){
              resolve(poll);
            }
          });
        }else{
          self.pollPromise.subscribe(data => {
            data.polls.forEach((poll, i) => {
              if(poll._id == id){
                resolve(poll);
              }
            });
          });
        }
        reject();
      }
    )
    
  }

  removePoll(id){
    this.polls = this.polls.filter((el, i) => {
      if(el._id == id) console.log("MATCH");
      return el._id !== id;
    });
  } 

  submitVote(id, option, callback){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    this.http.put("/api/poll", {id, option} , {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if(data.msg == "Already voted"){
          this.flashMessage.show("You already voted", {cssClass: "alert-warning", timeout: 3000 });
          return true;
        }
        this.polls = data.polls; 
        callback();
      });
  }

}
