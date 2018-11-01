import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route :Router) { }

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !==null 
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
}
