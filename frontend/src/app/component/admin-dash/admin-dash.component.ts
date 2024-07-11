import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { User } from '../../states/models/user.interface';
import { AdminDataService } from '../../service/admin-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [RouterLink,
    AdminHeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit{

  allUser:User[]=[]
  filteredUsers: any[] = [];

  constructor(private adduserservice:AdminDataService){

  }



  ngOnInit(): void {
      this.getAllEmployees()
  }


  getAllEmployees(){
    this.adduserservice.getAllUser().subscribe(res=>{
      console.log("data got suceesfully",res)
      this.allUser=res
      this.filteredUsers=res
    },err=>{
      console.log("error occured")
    })
  }



  deleteUser(userId:any){
    console.log("deleted sucess",userId)
    this.adduserservice.deleteOneUser(userId).subscribe(res=>{
      console.log('userdeleted')
      this.ngOnInit()
    },err=>{
      console.log("error occured")
    })
  }

  editUser(userId:any){
    
  }



  onSearch(event : any){
    const searchTerm = event.target.value;
    console.log("searchkey",searchTerm)
    if (searchTerm) {
      console.log("searchterm")
      this.adduserservice.searchUsers(searchTerm).subscribe({
        next: (data) => {
          console.log('data', data);
          this.filteredUsers = data;
        },
        error: (error) => {
          console.error('Error searching users:', error);
          // this.toastr.error('Failed to search users', 'Error');
        }
      });
    } else {
      this.filteredUsers = this.allUser;
    }
  }



}
