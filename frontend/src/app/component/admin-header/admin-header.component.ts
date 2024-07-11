import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminDataService } from '../../service/admin-data.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit{


  @Input() title!:string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>

  users: any[] = [];
  filteredUsers: any[] = [];


  constructor(private router : Router,
              private adminservice:AdminDataService
  ){

  }


  ngOnInit(): void {
      
  }

  logOut(){
    localStorage.removeItem("token")
    this.router.navigate(['/adminlogin'])
  }
}
