import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../states/models/user.interface';
import { Observable } from 'rxjs';
import { userInfo } from '../newmodel/viewuserInterface';
import { json } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  dataurl:string ='http://localhost:3000'
  constructor(private http:HttpClient) { }



  ///User Login
  // currentUser():Observable<User>{

  // }


  ///register new user
  newUser(userObj : User):Observable<User>{
    console.log("reached user service")
    return this.http.post<User>(`${this.dataurl}/newUser`,userObj)
  }


  userLogin(usercredential:{email: string , password:string}):Observable<any>{
    console.log("reached heer",usercredential)
    return this.http.post(`${this.dataurl}/userlogin`,usercredential )

  }


  ///individual userdetails from db
  fetchuserDataDB(userid:any){
    return this.http.get(`${this.dataurl}/:userid`,userid)
  }
  


  //assigning values to the localstorage
  setUsertoLocalstorage(response:any){
    localStorage.setItem('usertoken', response.token)
    localStorage.setItem('userdata' , JSON.stringify(response.userData))
  }


  //get userdata from storarge
  getUserDataFromstorage(){

    let obj : userInfo={
      email:'',
      profileImg:'',
      name:''
    }



    if (typeof localStorage !== 'undefined' && localStorage.getItem('userdata')) {
      let jsonstring = localStorage.getItem('userdata') as string;
      obj = JSON.parse(jsonstring);
    }

    return obj;
  }


  uploadImage(userId: string, image: File): Observable<userInfo> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<userInfo>(`${this.dataurl}/upload?userid=${userId}`, formData);
  }



  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.dataurl}/user/${userId}`);
  }
  



  updateUser(userDetails : userInfo ,userid:string){

    return this.http.put(`${this.dataurl}/updateuser/${userid}`,userDetails)

  }



  //check user is logged in or not
  isUserLoggedIn():boolean{
    if(localStorage.getItem('usertoken')){
      return true
    }
    return false
  }


  



}
