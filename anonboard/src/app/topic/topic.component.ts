import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [DataService]
})
export class TopicComponent implements OnInit {
  loaded = false;
  posts = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPosts(12).subscribe(
      (response) => {
        this.posts = JSON.parse(response["_body"]);
        this.loaded = true;
      }
    );
  }

}
