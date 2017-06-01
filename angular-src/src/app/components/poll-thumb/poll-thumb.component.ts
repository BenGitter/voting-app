import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../poll';
import { PollService } from '../../services/poll.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-poll-thumb',
  templateUrl: './poll-thumb.component.html',
  styleUrls: ['./poll-thumb.component.css']
})
export class PollThumbComponent implements OnInit {
  @Input() poll:Poll;
  @Input() showDetails:boolean = false;
  popularChoice:{option, percentage} = {option: "", percentage: 1};

  constructor(
    private pollService:PollService,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.getPopularChoice();
  }

  getPopularChoice(){
    console.log(this.poll);
    this.popularChoice.percentage = Math.round(Math.max(...this.poll.votes)/this.poll.votes.reduce((acc:number, val:number) => {
      return acc += val;
    })*100);
    this.popularChoice.option = this.poll.options[this.poll.votes.indexOf(Math.max(...this.poll.votes))];
  }

  onDeletePoll(e){
    if(confirm("Are you sure you want to delete this poll?")){
      this.pollService.deletePoll(this.poll._id).subscribe(data => {
        if(data.success){
          this.flashMessage.show("Poll successfully deleted", {cssClass: "alert-success", timeout: 3000 });
          this.pollService.removePoll(this.poll._id);
        }else{
          this.flashMessage.show("Please try again", {cssClass: "alert-warning", timeout: 3000 });
        }
      });
    }
  }

}
