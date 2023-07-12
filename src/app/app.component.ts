import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Router,Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  currentRoute = '';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(LoginComponent) loginForm!: LoginComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isRegisterOrForgotPasswordRoute(): boolean {
    return this.currentRoute === '/register' || this.currentRoute === '/forgot-password';
  }
}
