import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
