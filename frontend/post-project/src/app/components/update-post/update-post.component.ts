import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servers/post.service';
import { UserService } from 'src/app/servers/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  id: any;
  editpost: FormGroup;

  image: any;
  qrcode: any;

  selectImage(e: any) {
    this.image = e.target.files[0];
  }

  selectQrcode(e: any) {
    this.qrcode = e.target.files[0];
  }

  constructor(
    private postservice: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    private act: ActivatedRoute,
  ) {
    this.editpost = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      qrcode: [''], // You might want to add validation if required
    });
  }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.postservice.getpostbyid(this.id).subscribe(data => {
      this.editpost.patchValue(data);
    });
  }

  onSubmit() {
    console.log(this.editpost);
    let fd = new FormData();
    fd.append('title', this.editpost.value.title);
    fd.append('description', this.editpost.value.description);
    
    if (this.image) fd.append('image', this.image);
    else fd.append('image', this.editpost.value.image);

    if (this.qrcode) fd.append('qrcode', this.qrcode);
    else fd.append('qrcode', this.editpost.value.qrcode);

    this.postservice.update(this.id, fd).subscribe(
      (res) => {
        this.router.navigate(['/post']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
