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
  topictitle = 'Loading';
  topicid = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.topicid = this.route.snapshot.params['id'];
    this.dataService.getPosts(this.route.snapshot.params['id']).subscribe(
      (response) => {
        if(response["_body"]){
          this.posts = JSON.parse(response["_body"]).posts;
          this.topictitle = JSON.parse(response["_body"]).title;
          this.loaded = true;
        }
        else{
          this.loaded = true;
          this.topictitle = "No Topic Found";
        }
      },
      () => {

      }
    );
  }

}
