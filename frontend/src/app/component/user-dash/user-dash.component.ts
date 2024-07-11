import { Component, OnInit, inject } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import {  userInfo } from '../../newmodel/viewuserInterface';
import { UserDataService } from '../../service/user-data.service';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../states/UserNg/user.action'
import { selectUser } from '../../states/UserNg/user.selector';
import { Observable } from 'rxjs';
import { UserInfo } from 'os';
interface IlocalStorage{
  message:{},
  user:{profileImg: string}
}

@Component({
  selector: 'app-user-dash',
  standalone: true,
  imports: [AsyncPipe,RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent implements OnInit{


  formdata = new FormData()


  ngOnInit(): void {
      
  }
  selectedFile!:File

  user$!: Observable<userInfo>;


  // user$ = this.store.select(selectUser)

  // user$!: Observable<any>;

  noProfileImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJm69EJHsFuzuY5rGHvLv0jcO6MACgPyNGrSKe4Fm1yH0SB-Dcpf79OVa4vGi2yIYUrI&usqp=CAU';


  user:userInfo={
    name:'',
    email:'',
    profileImg:''
  }





  constructor(private userservice:UserDataService , private router: Router,
    private http:HttpClient,
    private store:Store
  ){
  
    this.user = this.userservice.getUserDataFromstorage()

    
  }






  


  onFileSelected(event:any ,userId:any){
    console.log(event)
    console.log(userId)
    this.selectedFile=<File>event.target.files[0]
  }


  onSubmit(userid:any, event: Event){
    console.log(userid)
    event.preventDefault(); 
  

    this.formdata.append("image" , this.selectedFile , this.selectedFile.name)
    
    this.http.post(`http://localhost:3000/upload?userid=${userid}`,this.formdata)
    .subscribe({
      next:(res: any)=>{
        console.log("res",res);
       
        const data: any = localStorage.getItem('userdata');
        const userData = JSON.parse(data);
        userData.profileImg = res.url;
        localStorage.setItem('userdata', JSON.stringify(userData));
        window.location.reload();



      },
      error:(err)=>{
        console.log(err);
        
      }
    })


  }


  onclick(userid:string){
    this.router.navigate([`/edituser/${userid}`])
  }

  
  logOut(){
    localStorage.removeItem('usertoken')
    localStorage.removeItem('userdata')
    this.router.navigate([''])
  }
  
  

  

  

  

}
