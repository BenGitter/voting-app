import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';

import { Poll } from '../../poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  id: number;
  poll: Poll;
  private sub: any;

  // Chart properties
  chartData:Array<Number> = [];
  chartLabels:Array<String> = [];
  chartOptions:Object = {
    legend: {
      position: "bottom"
    }
  };

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private pollService:PollService  
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.id);

      if(this.id === undefined){
        console.log("NAVIGATE");
        this.router.navigate(['/']);
        return false;
      }

      this.pollService.getPoll(this.id).then(poll => {
        this.poll = poll; 
        this.chartLabels = poll.options;
        this.chartData = poll.votes;
      });

    });

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  chartHovered(e){

  }

  onVote(option){
    console.log(option);
  }

}
