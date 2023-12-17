import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../servers/user.service';
import { PostService } from './../../servers/post.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  id: any;
  user: any;
  posts: any;
  router: any;
  constructor(
    private act: ActivatedRoute,
    private us: UserService,
    private pt: PostService,
    router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.us.getbyid(this.id).subscribe((res) => {
      this.user = res;
    });
    this.pt.getpostbyiduser(this.id).subscribe(
      (res) => {
        console.log(res);
        this.posts = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  i: any;
  delete(id: any) {
    this.pt.deletepost(id).subscribe((res) => {
      this.pt.getpostbyiduser(localStorage.getItem('currentUser')).subscribe(
        (res) => {
          console.log(res);
          this.posts = res;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
