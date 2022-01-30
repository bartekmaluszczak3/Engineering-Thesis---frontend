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
  router: Router
  authService: AuthService
  exForm!: FormGroup
  constructor(router: Router, authService: AuthService){
    this.router = router;
    this.authService = authService
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
