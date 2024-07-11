import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../states/models/user.interface';
import { UserDataService } from '../../service/user-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  userDetails!:FormGroup
  emailTakenError: string = '';

  constructor(private userService : UserDataService , private router:Router){

    this.userDetails = new FormGroup({
    
      name :new FormControl('',[Validators.required]),

      email:new FormControl('',[Validators.required , Validators.email , Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),

      password:new FormControl('',[Validators.required , Validators.minLength(8)]),

      cpassword:new FormControl('',[Validators.required])
    })
  

  }




  onSubmit(){
    console.log(this.userDetails.value)

    if(!this.userDetails.valid || (this.userDetails?.value.password !== this.userDetails?.value.cpassword)) {
      console.log("not valid")
      return this.userDetails.markAllAsTouched();
    }

    let user:User={
      name:this.userDetails.value.name,
      email:this.userDetails.value.email,
      password:this.userDetails.value.password,
      cpassword:this.userDetails.value.cpassword
    }

    this.userService.newUser(user).subscribe(res=>{
      console.log("New user Registered successfully")
      this.router.navigate(['/'])
    }, err=>{
      console.log("error registering new user" , err.error.message)
      if(err.error.message){
        this.emailTakenError=err.error.message
      }
    })

  }


}
