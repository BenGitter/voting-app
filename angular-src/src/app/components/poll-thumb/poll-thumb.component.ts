import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poll-thumb',
  templateUrl: './poll-thumb.component.html',
  styleUrls: ['./poll-thumb.component.css']
})
export class PollThumbComponent implements OnInit {
  @Input() poll:Object;

  constructor() { }

  ngOnInit() {
  }

}
