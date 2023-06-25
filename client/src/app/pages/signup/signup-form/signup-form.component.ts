import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { ValidationService } from 'src/modules/form-validation/validation.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit{
  signupForm: FormGroup;
  
  passwordHide = true;
  confirmPasswordHide = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private signupService: SignupService
  ) { }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.signupForm  = this.createSignupForm(); 
  }

  changePasswordHideState() {
    this.passwordHide = !this.passwordHide;
  }

  changeConfirmPasswordHideState() {
    this.confirmPasswordHide = !this.confirmPasswordHide;
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [this.validationService.matchPassword('password', 'confirmPassword')]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
    }
  }
}
