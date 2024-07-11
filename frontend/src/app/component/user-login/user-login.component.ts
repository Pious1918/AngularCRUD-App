import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserDataService } from '../../service/user-data.service';
import { UserLogin } from '../../newmodel/viewuserInterface';
import { Store } from '@ngrx/store';

import * as userActions from '../../states/UserNg/user.action'
import { selectUser, selectUserError } from '../../states/UserNg/user.selector';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink,
            ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginForm!:FormGroup




  passworderror : string =''
  

  

  constructor(private userservice:UserDataService ,
     private router:Router , 
     private store:Store<any>)
     
     
     {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })

  }

  user$ = this.store.select(selectUser)
  error$ = this.store.select(selectUserError)

  onSubmit(){


    const userData:UserLogin=this.loginForm.value
    console.log("user data is ",userData)
    this.store.dispatch(userActions.login({formData:userData}))


    this.user$.subscribe((user)=>{
      if(user){
        this.router.navigate(['/userdash'])
      }
      
      else{
        this.router.navigate([''])
        
      }
    })


    this.error$.subscribe((res)=>{
      
      console.log("dsfsd",res)
      this.router.navigate([''])
    })


  }




}
