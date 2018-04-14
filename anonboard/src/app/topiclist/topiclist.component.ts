import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topiclist',
  templateUrl: './topiclist.component.html',
  styleUrls: ['./topiclist.component.css'],
  providers: [DataService]
})
export class TopiclistComponent implements OnInit {
  topics: Array<{title: string, numposts: number, lastpost: string}> = [];
  loaded = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTopics().subscribe(
      (response) => {
        this.topics = JSON.parse(response["_body"]);
        this.loaded = true;
      }
    );
  }

}
