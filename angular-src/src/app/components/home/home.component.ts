import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private pollService:PollService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    
  }

}
