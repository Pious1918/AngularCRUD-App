import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../states/models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {


  dataurl:string='http://localhost:3000/admin/adduser'
  constructor(private http:HttpClient) { }


  ///add a new user
  adduser(userobj:User):Observable<User>{
    return this.http.post<User>(this.dataurl,userobj)
  }


  //get details of all user
  getAllUser():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/admin/getuser')
  }


  //delete a single user
  deleteOneUser(userId:User):Observable<User>{
    return this.http.delete<User>(`http://localhost:3000/admin/deleteUser/${userId}`)
  }


  searchUsers(query: string):Observable<User[]>{

    return this.http.get<User[]>(`http://localhost:3000/admin/searchuser?query=${query}`)
  }


}
