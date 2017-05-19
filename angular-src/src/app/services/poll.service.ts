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
    this.pollPromise = this.getPolls().publishReplay().refCount();; 
    this.pollPromise.subscribe(data => {
      this.polls = data.polls;
      this.pollsAvailable = true;
    });
  }

  getPolls(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/polls", {headers:headers})
      .map(res => res.json());
  }

  getPoll(id){
    let _pollPromise = this.pollPromise;
    return new Promise<Poll>(
      function(resolve, reject){
        _pollPromise.subscribe(data => {
          data.polls.forEach((poll, i) => {
            if(poll._id = id){
              resolve(poll);
            }
          });

          reject();
        });
      }
    )
    
  }

}
