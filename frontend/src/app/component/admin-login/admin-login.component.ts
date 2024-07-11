import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { AdminLogin } from '../../states/models/admin.interface';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {


  loginForm!:FormGroup
  isFormSubmitted:boolean=false;


  constructor(private adminService : AdminService){
    this.loginForm= new FormGroup({

      email : new FormControl(''),
      password: new FormControl('')

    })
  }



  onSubmit(){

    if(!this.loginForm.valid || this.isFormSubmitted)return this.loginForm.markAllAsTouched();
    this.isFormSubmitted = true

    const adminData : AdminLogin = this.loginForm.value;
    console.log(adminData)

    this.adminService.adminLogin(adminData.email, adminData.password)
    

  }

}
