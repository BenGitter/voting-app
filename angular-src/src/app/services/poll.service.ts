import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Injectable()
export class PollService {
  pollsAvailable = false;
  polls:Array<any> = [];

  constructor(private http:Http) { 
    this.getPolls().subscribe(data => {
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

}
