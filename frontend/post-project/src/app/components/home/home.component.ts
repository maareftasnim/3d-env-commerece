import { Component } from '@angular/core';
import { PostService } from 'src/app/servers/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getall().subscribe(
      (data: any) => {
        this.posts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
 

}
