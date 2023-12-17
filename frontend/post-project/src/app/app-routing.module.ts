import { AddComponent } from './components/add/add.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PostsComponent } from './components/posts/posts.component';
import { AccountComponent } from './components/account/account.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { Guard1Guard } from './guards/guard1.guard';
import { Guard2Guard } from './guards/guard2.guard';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddtocardComponent } from './addtocard/addtocard.component';

const routes: Routes = [
  {path: '' , component :HomeComponent , canActivate:[Guard2Guard] },
  {path: 'home' , component :HomeComponent},
  {path: 'login' , component :LoginComponent ,canActivate:[Guard2Guard]},
  {path: 'register' , component :SignupComponent,canActivate:[Guard2Guard]},
  {path: 'add' , component :AddComponent, canActivate:[Guard1Guard]},
  {path: 'user' , component :AccountComponent},
  {path: 'user/:id' , component :AccountComponent},
  {path: 'post' , component :PostsComponent, canActivate:[Guard1Guard]},
  {path: 'modify/:id', component: UpdatePostComponent},
  {path: 'modify', component: UpdatePostComponent, canActivate:[Guard1Guard]},
  {path:'modifyaccount/:id' , component :UpdateProfileComponent},
  { path: 'post-details/:id', component: PostDetailsComponent },
  { path: 'addToCart', component: AddtocardComponent },
   {path :'**' , component: NotfoundComponent},



];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
