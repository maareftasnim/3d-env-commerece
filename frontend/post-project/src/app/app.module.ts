import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostsComponent } from './components/posts/posts.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddComponent } from './components/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Guard1Guard } from './guards/guard1.guard';
import { Guard2Guard } from './guards/guard2.guard';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddtocardComponent } from './addtocard/addtocard.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    PostsComponent,
    UpdatePostComponent,
    UpdateProfileComponent,
    NotfoundComponent,
    AddComponent,
    PostDetailsComponent,
    AddtocardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [Guard1Guard, Guard2Guard],
  bootstrap: [AppComponent],
})
export class AppModule {}
