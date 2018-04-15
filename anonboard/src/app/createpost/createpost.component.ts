import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  postContent = '';

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  submitPost(){
    this.dataService.submitPost({id: this.route.snapshot.params['id'], content: this.postContent}).subscribe(
      (response) => {
        this.postContent = "";
        this.router.navigate(['/topic',this.route.snapshot.params['id']]);
      }
    );
  }

}
