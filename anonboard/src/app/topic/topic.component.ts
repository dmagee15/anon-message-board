import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [DataService]
})
export class TopicComponent implements OnInit {
  loaded = false;
  posts = [];
  topicid = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.topicid = this.route.snapshot.params['id'];
    this.dataService.getPosts(this.route.snapshot.params['id']).subscribe(
      (response) => {
        this.posts = JSON.parse(response["_body"]);
        this.loaded = true;
      }
    );
  }

}
