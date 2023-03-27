import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup;

  constructor(private autheService: AuthService) {}


  ngOnInit(): void
  {
    this.loginForm = this.createFormGroup( );

  }


  createFormGroup(): FormGroup{
    return new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      });
  }

 login(): void{
  this.autheService.login(this.loginForm.value.email, this.loginForm.value.password)
  .subscribe();
 }

}
