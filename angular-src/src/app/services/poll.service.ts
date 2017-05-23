import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Poll } from '../poll';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class PollService {
  pollsAvailable = false;
  polls:Array<any> = [];
  pollPromise:any;

  constructor(private http:Http) {
    this.pollPromise = this.getPolls().publishReplay().refCount(); 
    this.pollPromise.subscribe(data => {
      this.polls = data.polls;
      this.pollsAvailable = true;

      console.log(this.polls);
    });
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
            reject();
          });
        }
      }
    )
    
  }

  submitVote(id, option, callback){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    this.http.put("/api/poll", {id, option} , {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.polls = data.polls; 
        callback();
      });
  }

}
