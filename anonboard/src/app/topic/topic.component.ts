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
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getPosts(this.route.snapshot.params['id']).subscribe(
      (response) => {
        this.posts = JSON.parse(response["_body"]);
        this.loaded = true;
      }
    );
  }

}
