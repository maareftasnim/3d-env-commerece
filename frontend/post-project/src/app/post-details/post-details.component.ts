import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../servers/post.service';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{
  postId:any;
  postDetails: any;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.postId = params['id'];
    this.loadPostDetails();
  });
  }
  loadPostDetails() {
    this.postService.getpostbyid(this.postId).subscribe(
      (res) => {
        this.postDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
}
