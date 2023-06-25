import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit{
  signupForm: FormGroup;
  hide = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) { }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.signupForm  = this.createSignupForm(); 
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }
}
