import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr[app-topicitem]',
  templateUrl: './topicitem.component.html',
  styleUrls: ['./topicitem.component.css']
})
export class TopicitemComponent implements OnInit {
  @Input() topic:topic;
  topictitle: string = '';
  numposts: number = 5;
  lastpost: string = '7';

  constructor() { }

  ngOnInit() {
  }

}
