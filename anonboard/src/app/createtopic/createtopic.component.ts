import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtopic',
  templateUrl: './createtopic.component.html',
  styleUrls: ['./createtopic.component.css'],
  providers: [DataService]
})
export class CreatetopicComponent implements OnInit {
  topicTitle = '';
  topicContent = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  submitTopic(){
    this.dataService.submitTopic({title: this.topicTitle, content: this.topicContent}).subscribe(
      (response) => {
        console.log(response);
      }
    );
    console.log(this.topicTitle);
    console.log(this.topicContent);
    this.topicTitle = "";
    this.topicContent = "";
    this.router.navigate(['/']);
  }
}
