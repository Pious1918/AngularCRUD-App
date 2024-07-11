import { createAction, props } from "@ngrx/store";
import {  UserLogin, userInfo } from "../../newmodel/viewuserInterface";
import { UserInfo } from "node:os";


export const login = createAction('[user component] Login', props<{formData:UserLogin}>())

export const loginsuccess  = createAction('[user] Login Success' , props<{user:userInfo}>() )

export const loginfailure = createAction('[user] Login Failure', props<{error : any}>())


export const UpdateUser= createAction('[Update component] Update User' , props<{userDetails:any}>())



export const uploadImage = createAction('[user] upload image' , props<{userId : string , image:File}>())

export const uploadImageSuccess = createAction(
    '[User] Upload Image Success',
    props<{ profileImg: string }>()
  );
  
  export const uploadImageFailure = createAction(
    '[User] Upload Image Failure',
    props<{ error: any }>()
  );


export const userProfile = createAction('[User] User Profile Loaded', 
props<{ profile: userInfo }>());



 
export const getUserData = createAction(
  '[User home component] Get user Data'
)


 
export const updateuser = createAction(
  '[User] update user',
  props<{user:userInfo , userid:string}>()
)


export const updateUserSuccess = createAction(
  '[User] update user successs',
  props<{user : userInfo}>()
)

export const updateUserFailure = createAction(
  '[User] update user failure',
  props<{error : any}>()
)

