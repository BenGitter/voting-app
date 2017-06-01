import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poll } from '../../poll';
import { AuthService } from '../../services/auth.service';
import { PollService } from '../../services/poll.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
  title: string;
  options: string[] = ["",""];

  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private pollService:PollService,
    private router:Router  
  ) { }

  ngOnInit() {
  }

  onFormSubmit(e){
    e.preventDefault();
    
    // Check for title
    if(!e.target.elements[0].value){
      this.flashMessage.show("Poll must have a title", {cssClass: "alert-danger", timeout: 3000 });
      return false;
    }

    // Init poll object
    let poll = {
      name: e.target.elements[0].value,
      options: [],
      created_by: this.authService.user.username,
      votes: []
    };

    // Add poll options
    for(let i = 1; i < e.target.elements.length-2; i++){
      let option = e.target.elements[i].value;

      if(option){
        poll.options.push(option);
        poll.votes.push([]);
      }
    }

    // Check poll options
    if(poll.options.length < 2){
      this.flashMessage.show("Poll must have at least 2 options", {cssClass: "alert-danger", timeout: 3000 });
      return false;
    }

    // Post new poll
    this.pollService.postPoll(poll).subscribe(data => {
      if(data.success){
        this.pollService.polls.unshift(data.poll);
        this.flashMessage.show("Poll added", {cssClass: "alert-success", timeout: 3000 });
        this.router.navigate(['/poll', data.poll._id]);
      }else{
        this.flashMessage.show("An error occurred, please try again", {cssClass: "alert-danger", timeout: 3000 });
      }
    })

    console.log(poll);

  }

  onAddOption(){
    this.options.push("");
  }
}
