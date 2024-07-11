import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient , private router : Router) { }



  adminName :string ='admin@123';
  password:string ='admin@123'




  ///admin login

  adminLogin(adminemail:string , adPass : string){



    if(adminemail===this.adminName){
      console.log("correct Email")
      if(adPass===this.password){
        console.log("you are loggedin")
        localStorage.setItem("token" , (Math.random()+1).toString(30).substring(7))
        this.router.navigate(['/admindash'])
      }else{
        // alert("wrong password")
        this.router.navigate(['/adminlogin'])
      }
    }else{
      console.log("Login is failed")
      this.router.navigate(['/adminlogin'])
    }
  }




  ///check admin is logged in or not 
  isAdminLoggedIn():Boolean{
    if(localStorage.getItem("token")){
      return true
    }
    return false
  }



}
