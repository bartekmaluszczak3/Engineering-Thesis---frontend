import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  router: Router
  constructor(router: Router){
    this.router = router;
  }

  checkAuth(){
    return localStorage.getItem("token") == null
  }

}
