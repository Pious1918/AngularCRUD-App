import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { UserDataService } from '../../service/user-data.service';
import { login, loginfailure, loginsuccess, uploadImage, uploadImageFailure, uploadImageSuccess } from './user.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';

import * as UserActions from './user.action'
 


@Injectable()
export class UserEffects {


  constructor(
    private actions$: Actions,
    private userservice: UserDataService,
    private route: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.userservice.userLogin(action.formData).pipe(
          map((response: any) => {
            // localStorage.setItem('token' , response.token);
            console.log('I am here');
            console.log(response);
            this.userservice.setUsertoLocalstorage(response);
            // this.route.navigate(['userdash'])
            return loginsuccess({ user: response.userData });
          }),
          catchError((error) => of(loginfailure({ error })))
        )
      )
    )
  );




  // uploadImage$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(uploadImage),
  //     mergeMap(({ userId, image }) =>
  //       this.userservice.uploadImage(userId, image).pipe(
  //         map((res) => uploadImageSuccess({ profileImg: res.profileImg })),
  //         catchError((error) => of(uploadImageFailure({ error })))
  //       )
  //     )
  //   )
  // );


  // updateUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.updateUser),
  //     mergeMap(({ updatedUser }) =>
  //       this.userservice.updateUser(updatedUser).pipe(
  //         map((response) => UserActions.updateUserSuccess({ updatedUser: response })),
  //         catchError((error) => of(UserActions.updateUserFailure({ error })))
  //       )
  //     )
  //   )
  // );



  updateUser$ = createEffect(()=>
    
  
    this.actions$.pipe(
      ofType(UserActions.updateuser),
      mergeMap(action=>
        this.userservice.updateUser(action.user , action.userid).pipe(
          map(user=>UserActions.updateUserSuccess({user})),
          catchError(error=> of(UserActions.updateUserFailure({error})))
        )
      )
    )
  
  )

  



  










//   getuserData$ = createEffect(()=>

//     this.actions$.pipe(

//         ofType(UserActions.getUserData),
//         switchMap((action)=>{
//             // return this.userservice.ge
//         })
//     )

// )








}
