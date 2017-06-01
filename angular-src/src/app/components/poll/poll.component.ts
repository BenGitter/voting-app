import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private flashMessage:FlashMessagesService,
    private pollService:PollService  
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.id);

      if(this.id === undefined){
        this.router.navigate(['/']);
        return false;
      }

      this.getPoll();

    });

  }

  getPoll(){
    this.pollService.getPoll(this.id).then(poll => {
      this.poll = poll; 
      this.chartLabels = poll.options;
      this.chartData = poll.votes;
    }, error => {
      this.router.navigate(['/']);
      this.flashMessage.show("Poll not found", {cssClass: "alert-danger", timeout: 3000 });
    });    
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  chartHovered(e){

  }

  onVote(option){
    console.log(this.id);
    this.pollService.submitVote(this.id, option, () => {
      this.getPoll();
    });
  }

}
