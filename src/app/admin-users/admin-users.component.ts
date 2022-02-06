import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userInfo:any = this.adminService.get_users_info().subscribe(res=>{
    console.log(res)
    this.userInfo = res
  })

  constructor(private adminService: AdminService) {
   
   }

  ngOnInit(): void {
   
  }

  banUser(login:any){
    this.adminService.ban_user(login).subscribe()
    window.location.reload();
  }

}
