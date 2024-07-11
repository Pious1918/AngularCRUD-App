import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userInfo } from '../../newmodel/viewuserInterface';
import { UserDataService } from '../../service/user-data.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../states/UserNg/user.selector';
import * as userActions from '../../states/UserNg/user.action'
import { UserInfo } from 'os';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule , AsyncPipe],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  editForm!: FormGroup
  user:any={}
  constructor(private userservice:UserDataService ,
    private router: Router,
    private store : Store<any>,
    private route :ActivatedRoute
  
  ){}

  user$ = this.store.select(selectUser)

  ngOnInit(): void {

    this.user= this.userservice.getUserDataFromstorage()


    this.editForm = new FormGroup({
     name:new FormControl(this.user.name),
      password: new FormControl(''),
      cpassword: new FormControl(''),
    
    });
      console.log(this.user);
      console.log("",this.route.snapshot.params['id'])
      console.log("current user is",this.user.profileImg)
      
  }






  updateUser(){
    const userid= this.user._id
    console.log("id",userid)
    const {name}= this.editForm.value
    console.log("namee",name)
    console.log("fgdgdfg")
    const updatedUserData = { name };

    // this.store.dispatch(userActions.updateuser({user : updatedUserData , userid}))

    this.userservice.updateUser(updatedUserData , userid).subscribe(updatedUser=>{
      console.log("here iamm")
      this.user=updatedUser
      console.log(this.user)
     
      const data: any = localStorage.getItem('userdata');
      const userData = JSON.parse(data);
      
      userData.name = name;
      
      localStorage.setItem('userdata', JSON.stringify(userData));
      window.location.reload();

      
    })
    this.router.navigate(['userdash'])

  }


}
