import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginPayload, LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.createFormLogin();
  }

  createFormLogin(): FormGroup {
    return this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  changeHideState() {
    this.hide = !this.hide;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value as LoginPayload;

      this.loginService.login(user);
    }
  }
}
