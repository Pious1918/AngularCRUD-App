import { Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
import { adminGuard } from './service/admin.guard';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';
import { AdminAddUserComponent } from './component/admin-add-user/admin-add-user.component';
import { UserDashComponent } from './component/user-dash/user-dash.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { userGuard } from './service/user.guard';

export const routes: Routes = [

    {path: '' , component : UserLoginComponent},
    {path: 'userdash' , component : UserDashComponent , canActivate:[userGuard]},
    {path: 'register' , component : UserRegisterComponent},
 
    {path: 'edituser/:id' , component : UserEditComponent , canActivate:[userGuard]},


    {path: 'adminlogin' , component : AdminLoginComponent},
    {path: 'admindash' , component : AdminDashComponent , canActivate:[adminGuard]},
    {path: 'addUser' , component : AdminAddUserComponent , canActivate:[adminGuard]},
];
