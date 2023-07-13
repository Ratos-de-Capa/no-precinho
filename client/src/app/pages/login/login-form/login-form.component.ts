import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'src/modules/toastr-module';
import { LoginPayload, LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.createFormLogin();
  }

  createFormLogin(): FormGroup {
    return this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  changeHideState() {
    this.hide = !this.hide;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const user: LoginPayload = this.loginForm.value;

        const result = await this.loginService.login(user);

        if (!result) {
          this.toastr.danger('Erro ao realizar login!');
          return;
        }

        if (!result.success) {
          this.toastr.danger('Login ou senha inválidos!');
          return;
        }

        this.toastr.success('Login realizado com sucesso!');
        this.goToHome();
      } catch (error) {
        this.toastr.danger('Erro ao realizar login!');
      }
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
