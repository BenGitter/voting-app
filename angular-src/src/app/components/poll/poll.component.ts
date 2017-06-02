import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

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
    private pollService:PollService,
    private authService:AuthService  
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

  onAddOption(input:HTMLInputElement, button:HTMLButtonElement){
    if(button.innerHTML == "+"){
      let option = input.value;
      if(option){
        this.pollService.addOption(this.poll._id, option).subscribe(data => {
          if(data.success){
            this.poll.votes.push(0);
            this.poll.options.push(option);
            this.chartLabels = this.poll.options;
            this.chartData = this.poll.votes;
          }
        })
        button.innerHTML = "Add option";
        input.value = "";
        input.style.display = "none";
      }
    }else{
      button.innerHTML = "+";
      input.style.display = "block";
    }
    
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
