import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  exForm!: FormGroup
  login:any = localStorage.getItem('token')
  role: any = this.authService.getRole().subscribe(res =>{
    this.role = res
  })
  constructor(private router: Router, private authService: AuthService){
    this.exForm = new FormGroup({
      search: new FormControl(null)
    })
  }

  search(){
    let searching = this.exForm.get('search')?.value
    this.router.navigateByUrl("/search?query="+ searching)
  }


  logout(){
    localStorage.removeItem('token')
  }

}
