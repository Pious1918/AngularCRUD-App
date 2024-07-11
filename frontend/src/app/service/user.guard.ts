import { inject } from '@angular/core';
import { CanActivateFn ,Router ,ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { UserDataService } from './user-data.service';

export const userGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot) => {
    const userService = inject(UserDataService)


    const router :Router = inject(Router)
    const routes :string[]=['/']
  
  
    if(userService.isUserLoggedIn()===true){
      return true
    }
    else{
      router.navigate(routes)
      return false
    }
  };
