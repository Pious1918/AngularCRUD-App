


import { createReducer, on } from "@ngrx/store";
import {  userInfo } from "../../newmodel/viewuserInterface";

import * as UserActions from './user.action'
import { UserInfo } from "node:os";
import { state } from "@angular/animations";


export interface UserState{
    user: userInfo | null,
    token : string,
    loading: boolean,
    error: any,
    profileimage:any
}


const initialState: UserState={
    user:null,
    token:'',
    loading:false,
    error:null,
    profileimage:null
}


export const userReduce = createReducer(

    initialState,
    on(UserActions.login , (state)=>({...state , loading:true})),
    on(UserActions.loginsuccess , (state , {user}) => ({
        ...state,
        user,
        // token,
        loading:false,
        error:null
    })),
    on(UserActions.loginfailure , (state , action : {error:any})=>({
        ...state,
        loading:false,
        error:action.error
    })),

    on(UserActions.UpdateUser , (state , action)=>{
        return {
            ...state,
            user:action.userDetails
        }
    }),



///today commented
// on(UserActions.updateUser , (state ,action)=>({
//     ...state,
//     user:{...state.user ,...action.user}
// }))

// on(UserActions.getUserData , (state:UserState)=>({
//     ...state
// })),
on(UserActions.updateuser , state=>({...state})),
on(UserActions.updateUserSuccess , (state , {user})=>({...state , user})),
on(UserActions.updateUserFailure , (state , {error})=>({...state , error }))




)
