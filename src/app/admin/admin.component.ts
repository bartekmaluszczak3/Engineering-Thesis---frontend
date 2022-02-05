import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  statistic: any = this.adminService.get_info().subscribe(res=>{
    console.log(res)
    this.statistic = res
  })
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.authService.getRole().subscribe(res=>{
    },
    err =>{
      console.log(err.error.text)
      if(err.error.text != "ADMIN"){
        this.router.navigate(['/error'])

      }
    })
  }

}
