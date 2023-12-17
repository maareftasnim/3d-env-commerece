import { Component, OnInit } from '@angular/core';
import { UserService } from './../../servers/user.service';
import { Router } from '@angular/router';
import { PostService } from './../../servers/post.service';
import { ChekoutServiceService } from 'src/app/servers/chekout-service.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private usr: UserService,
    private router: Router,
    private pt: PostService,
    private checkout:ChekoutServiceService
  ) {}
  ngOnInit(): void {
    this.invokeStripe();
  }
  success :boolean =false
  failure:boolean=false
    paymentHandler:any =null;
    

  post = {
    title: '',
    description: '',
  };

  image: any;
  select(e: any) {
    this.image = e.target.files[0];
  }
  qrcode: any;
  select1(e: any) {
    this.qrcode = e.target.files[0];
  }

  create() {
    let fd = new FormData();
    fd.append('title', this.post.title);
    console.log(this.post);
    fd.append('idUser', this.usr.getuserdatafromtoken());
    fd.append('description', this.post.description);
    fd.append('image', this.image);
    fd.append('qrcode', this.qrcode);
    this.pt.create(fd).subscribe(
      (res) => {
        this.router.navigate(['/post']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  makePayement(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: "pk_test_51OO3qfBUp67JrVJ1bD5mSVqiOjFWKYLD8KerK9m0Sejuwv1jvTthztDhndtyhmkTuAd86FA46k5YQjweRl6qG2f600hWucjuhN",
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
  
        paymentStripe( stripeToken)
      }
    });
  
    const paymentStripe = (stripeToken :any )=>{
      this.checkout.makePayment(stripeToken).subscribe((data:any)=>{
        console.log(data)
        if (data.data ==="success"){
          this.success =true
        }else{
          this.failure =true
        }
      })
    }
  
    paymentHandler.open({
      name: 'Demo Site',
      description: '2 widgets $10 each + tax',
      amount: amount * 100,
    });
  }
  
  
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OO3qfBUp67JrVJ1bD5mSVqiOjFWKYLD8KerK9m0Sejuwv1jvTthztDhndtyhmkTuAd86FA46k5YQjweRl6qG2f600hWucjuhN',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log("token", stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
