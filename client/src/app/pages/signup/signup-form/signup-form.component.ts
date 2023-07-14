import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { ValidationService } from 'src/modules/form-validation/validation.service';
import { Router } from '@angular/router';
import * as md5 from 'md5';
import { SessionCacheService } from 'src/modules/services/session-cache.service';

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
    private signupService: SignupService,
    private router: Router,
    private sessionCacheService: SessionCacheService
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
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [this.validationService.matchPassword('password', 'confirmPassword')]
    });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const user: { email, login, password, name } = this.signupForm.value;

      const [result, message] = await this.signupService.createUser(user);

      alert(message)

      if (result) {
        this.sessionCacheService.set('session', {name: user.name})
        this.router.navigate(['/home']);
      }
    }
  }
}
