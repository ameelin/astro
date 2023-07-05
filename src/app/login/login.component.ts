import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  username: string = '';
  password: string = '';

  loginFormSubmit() {
    // Simulate login process
    // You can replace this with your actual login logic
    if (this.username === 'john' && this.password === 'doe') {
      this.login.emit();
    } else {
      alert('Invalid username or password');
    }
  }
}
