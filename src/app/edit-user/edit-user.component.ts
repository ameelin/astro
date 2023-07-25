import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  desiredUserName: string = '';
  birthStar: string = '';
  birthDate: string = '';
  longitude: string = '';
  longitudeDirection: string = ''; 
  modifiedDate : string = '';

  constructor(private userService: UserService, private router : Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.userId = localStorage.getItem("userId") ?? '';
      const user = {
        userId: this.userId,
        desiredUserName: this.desiredUserName,
        birthStar: this.birthStar,
        birthDate: this.birthDate,
        longitude: this.longitude,
        longitudeDirection: this.longitudeDirection,
        modifiedDate: new Date().toLocaleDateString('en-US'),
        modifiedBy: this.userId
      };

      //Now update user data
      this.userService.editUser(user).subscribe(
        () => {
          console.log(`User with ID ${user.userId} updated successfully!`);
        },
        (error) => {
          console.log('Error updating user:', error);
        }
      );
    } else {
      console.log('Please fill in all the required fields with valid data.');
    }
  }

  isFormValid(): boolean {
    // Check that desiredUserName and birthStar have values
    if (this.desiredUserName.trim() === '' || this.birthStar.trim() === '') {
      return false;
    }
  
    // Check desiredUserName length is between 6 and 8 characters
    if (this.desiredUserName.trim().length < 6 || this.desiredUserName.trim().length > 8) {
      return false;
    }
  
    // Additional validation for birthDate and longitude if they are filled
    if (this.birthDate.trim() !== '' && !/^\d{2}\/\d{2}\/\d{4}$/.test(this.birthDate)) {
      return false;
    }
  
    if (this.longitude.trim() !== '' && !/^(\d{1,3}\.\d{2})$/.test(this.longitude)) {
      return false;
    }
  
    // Validate longitude direction if longitude is filled
    if (this.longitude.trim() !== '' && this.longitudeDirection.trim() === '') {
      return false;
    }
  
    return true;
  }
  
}
