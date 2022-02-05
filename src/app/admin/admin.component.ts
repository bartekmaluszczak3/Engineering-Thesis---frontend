import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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
