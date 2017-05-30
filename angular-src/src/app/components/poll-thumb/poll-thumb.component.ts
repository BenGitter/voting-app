import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../poll';

@Component({
  selector: 'app-poll-thumb',
  templateUrl: './poll-thumb.component.html',
  styleUrls: ['./poll-thumb.component.css']
})
export class PollThumbComponent implements OnInit {
  @Input() poll:Poll;
  @Input() showDetails:boolean = false;
  popularChoice:{option, percentage} = {option: "", percentage: 1};

  constructor() { }

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

}
