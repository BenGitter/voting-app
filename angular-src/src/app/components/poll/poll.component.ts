import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  // Chart properties
  chartData:Array<Number>;
  chartLabels:Array<String>;
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
      this.id = +params["id"];

      if(this.id === undefined || !this.pollService.pollsAvailable){
        this.router.navigate(['/']);
        return false;
      }

      if(this.pollService.pollsAvailable){
        this.chartLabels = this.pollService.polls[this.id].options;
        this.chartData = this.pollService.polls[this.id].votes;
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  chartHovered(e){

  }

}
