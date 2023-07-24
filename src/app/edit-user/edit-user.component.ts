import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  desiredUserName: string = '';
  birthStar: string = '';
  birthDate: string = '';
  longitude: string = '';
  longitudeDirection: string = ''; // Add this field

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isFormValid()) {
      // Submit the form data to your desired logic or API
      console.log('Form submitted successfully!');
      console.log('Desired User Name:', this.desiredUserName);
      console.log('Birth Star:', this.birthStar);
      console.log('Birth Date:', this.birthDate);
      console.log('Longitude:', this.longitude);
      console.log('Longitude Direction:', this.longitudeDirection); // Log the longitude direction
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
