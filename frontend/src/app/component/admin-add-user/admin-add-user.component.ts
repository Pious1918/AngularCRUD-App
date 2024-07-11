import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../states/models/user.interface';
import { AdminDataService } from '../../service/admin-data.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {

  userDetails!:FormGroup
  emailTakenError: string = '';
  // ngOnInit(): void {
  //   this.userDetails = new FormGroup({
    
  //     id: new FormControl(""),
  //     name :new FormControl(''),
  //     email:new FormControl(''),
  //     password:new FormControl(''),
  //     cpassword:new FormControl('')
  //   })
  // }
constructor(private adduserservice:AdminDataService ,private router:Router){


  this.userDetails = new FormGroup({
    
    name :new FormControl('',[Validators.required]),

    email:new FormControl('',[Validators.required , Validators.email , Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),

    password:new FormControl('',[Validators.required , Validators.minLength(8)]),

    cpassword:new FormControl('',[Validators.required])
  })


}




  allUser :User[]=[]

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

    this.adduserservice.adduser(user).subscribe(res=>{
      console.log('user added successfully')
      this.router.navigate(['/admindash'])

      // this.ngOnInit()
    } , err=>{
      console.log("error occured" , err.error.message)
      if(err.error.message){
        this.emailTakenError=err.error.message
      }
    })
   
  }

}
