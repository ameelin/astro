import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Router,Event, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

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

  constructor(private auth : AuthService, private userService: UserService, private router: Router) {}

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
    this.userService.setUserLoggedIn(true);
  }

  logout() {
    this.isLoggedIn = false;
    this.userService.setUserLoggedIn(false);
    this.auth.logout();
    localStorage.removeItem("userId");
    localStorage.clear();
  }

  isRegisterOrForgotPasswordRoute(): boolean {
    return this.currentRoute === '/register' || this.currentRoute === '/forgot-password';
  }
}
