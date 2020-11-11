import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
