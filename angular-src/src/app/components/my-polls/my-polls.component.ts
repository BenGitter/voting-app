import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {

  constructor(
    public pollService:PollService,
    public authService:AuthService  
  ) { }

  ngOnInit() {
  }

}
