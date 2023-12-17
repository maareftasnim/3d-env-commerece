import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/servers/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  id: any;
  editprofile!: FormGroup;


  image: any;
  select(e: any) {
    this.image = e.target.files[0];
  }
  constructor(
    private userservice: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private act: ActivatedRoute,
  ) {
    this.editprofile = this.formBuilder.group({

      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: ['', Validators.required],

      age: ['', Validators.required],
      gender: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.userservice.getbyid(this.id).subscribe(data => {
      this.editprofile.patchValue(data);
    }
    )
  }

  onSubmit() {
    console.log(this.editprofile)
    let fd = new FormData();
    fd.append('firstname', this.editprofile.value.firstname);
    fd.append('gender', this.editprofile.value.gender);
    fd.append('age', this.editprofile.value.age);

    fd.append('email', this.editprofile.value.email);
    fd.append('lastname', this.editprofile.value.lastname);

    console.log(this.editprofile.value)
    console.log(this.image)
    if (this.image)
      fd.append('image', this.image);
    else fd.append('image', this.editprofile.value.image);



    this.userservice.update(this.id,fd).subscribe(
      (res) => {
        this.router.navigate(['/user/' + this.id]);
      },
      (err) => {
        console.log(err);
      }
    );

  }
}
