import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() userLoggedIn: EventEmitter<void> = new EventEmitter<void>();
  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter<void>();


  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private userService: UserService, private router : Router) { }

  ngOnInit(): void {

  }

  login(){
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password).subscribe(
      (res) => {
        if (res.user) {
          // If the login is successful and res.user is not null,
          // obtain the user's token using res.user.getIdToken() method
          res.user.getIdToken().then((token: string) => {
            localStorage.removeItem("userId");
            localStorage.clear();
            // Store the token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', this.email);
          });
        }
        this.userService.checkUserExists(this.email).subscribe(
          (userExists) => {
            if (userExists) {
              // check if birthStar exists
              this.userService.checkBirthStarExists(this.email).subscribe(
                (birthStarExists) => {
                  if(birthStarExists){
                    this.navigateTo('/find-matches');
                  }
                  else{
                    localStorage.setItem('userId', this.email);
                    this.navigateTo('/edit-user');
                  }
                },
                (error) => {
                  // Handle error checking birthstar
                  alert(error.message);
                  this.router.navigate(['/login']);
                });
              
            } else {
              // User does not exist, call the addUser method
              const user = {userId: this.email,birthStar:''}; // Replace ... with additional user data
              this.userService.addUser(user).subscribe(
                () => {
                  // Logic after adding the user
                  localStorage.setItem('userId', this.email);
                  this.navigateTo('/edit-user');
                },
                (error) => {
                  // Handle error while adding the user
                  alert(error.message);
                  this.router.navigate(['/login']);
                });
            }
          },
          (error) => {
            // Handle error while checking user existence
            alert(error.message);
            this.router.navigate(['/login']);
          });
      },
      (error) => {
        // navigate back to login page
        alert(error.message);
        this.router.navigate(['/login']);
      });
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem("userId");
    localStorage.clear();
    alert("logout:"+localStorage.getItem("userId"));
    this.userLoggedOut.emit();
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  navigateTo(location:string){
    this.email = '';
    this.password = '';
    this.userLoggedIn.emit();
    this.router.navigate([location]);

  }
 
}