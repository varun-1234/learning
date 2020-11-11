import { Component, OnInit } from '@angular/core';
import {CarlistService} from '../carlist.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router }  from '@angular/router';
import firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  items;
  constructor(private carlistService:CarlistService , public auth: AngularFireAuth , private router: Router) { }
  username:string='';
  password:string='';
  ngOnInit(): void {
    this.items=this.carlistService.getCarlist();
    console.log('carlist', this.carlistService.getCarlist());
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result =>{
      console.log('user',result.user)
      localStorage.setItem('user',JSON.stringify(result.user))
      this.router.navigate(['home'])
      
    });
  }
 
  normalLogin(){
    if(this.username !== ''){
      localStorage.setItem('user',JSON.stringify({
        displayName:this.username
      }))
       this.router.navigate(['home'])
    }
   
  }
 
}
