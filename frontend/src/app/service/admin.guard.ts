import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from './admin.service';

export const adminGuard: CanActivateFn = (route, state) => {


  const adminservice = inject(AdminService)

  const router : Router=inject(Router)

  const routes :string[]=['/adminlogin']

  if(adminservice.isAdminLoggedIn()===true){
    return true
  }
  else{
    router.navigate(routes)
    return false
  }


  
};
