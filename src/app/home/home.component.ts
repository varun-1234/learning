import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router }  from '@angular/router';
import {CarlistService, Cars} from '../carlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username:string='';
  items;
  editIndex;
  constructor(private carlistService:CarlistService, public auth: AngularFireAuth , private router: Router) { }

  ngOnInit(): void {
    this.items=this.carlistService.getCarlist();
    console.log('carlist', this.carlistService.getCarlist());
    this.username=JSON.parse(localStorage.getItem('user')).displayName;
  }
  logout(){
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['login']);
  }
  update(doc){
    console.log('doc',doc);
    this.editIndex=null;
    this.carlistService.update(doc.id, { Created_date: doc.Created_date , Engine_size:doc.Engine_size , Make:doc.Make ,Max_speed:doc.Max_speed })
    this.items=this.carlistService.getCarlist();
  }
  edit(index){
    this.editIndex=index;
    console.log('index',index);

  }
  delete(doc){
    this.carlistService.delete(doc.id)
    this.items=this.carlistService.getCarlist(); 
  }
 
}
