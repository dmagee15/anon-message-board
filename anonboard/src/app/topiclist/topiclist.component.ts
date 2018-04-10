import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topiclist',
  templateUrl: './topiclist.component.html',
  styleUrls: ['./topiclist.component.css']
})
export class TopiclistComponent implements OnInit {
  topics: Array<{title: string, numposts: number, lastpost: string}> = [
    {title: 'What is the meaning of life?', numposts: 7, lastpost: '11:37'},
    {title: 'How many eggs are in a dozen?', numposts: 9, lastpost: '12:13'},
    {title: 'Question about the movie Interstellar', numposts: 15, lastpost: '7:17'},
    {title: 'How often do solar eclipses happen?', numposts: 3, lastpost: '12:37'},
    {title: 'How many species of animals are there?', numposts: 10, lastpost: '4:30'},
  ];
  loaded = false;
  constructor() { }

  ngOnInit() {
  }

}
