import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private autheService: AuthService) { }

  
  

  ngOnInit():void {
    this.signupForm = this.createFormGroup( );
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      fname: new FormControl("", Validators.required),
      lname: new FormControl(""),
      email: new FormControl("", Validators.required),
      mnumber: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
  
signup(): void{
  this.autheService.signup(this.signupForm.value).
  subscribe((msg) => console.log(msg));
}

}