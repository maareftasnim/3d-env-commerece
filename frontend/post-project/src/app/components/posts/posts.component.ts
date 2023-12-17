import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from './../../servers/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 searchtitle:string ='' ;
  constructor(private data : PostService, private router: Router){}

  posts: any ;
  ngOnInit():void{
    this.data.getall()
    .subscribe(
      res=>{
        this.posts = res ;
      },
      err=>{
        console.log(err);
      }
    )
  }
  search(){
    if(this.searchtitle != ""){
      this.posts=this.posts.filter(
        (res:any) =>{
          return res.title.toLocaleLowerCase().match(this.searchtitle.toLocaleLowerCase())
        }
      )
    }else if (this.searchtitle == "")
    {
      this.ngOnInit();
    }
   
  }
  viewDetails(postId: any) {
    this.router.navigate(['/post-details', postId]);
  }

}
