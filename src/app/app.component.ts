import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(LoginComponent) loginForm!: LoginComponent;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  login() {
    // Simulate login process
    // You can replace this with your actual login logic
    if (this.loginForm.username === 'john' && this.loginForm.password === 'doe') {
      this.isLoggedIn = true;
    } else {
      alert('Invalid username or password');
    }
  }

  logout() {
    // Simulate logout process
    // You can replace this with your actual logout logic
    this.isLoggedIn = false;
  }
}
