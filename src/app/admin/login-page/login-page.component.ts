import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('label', {static: false}) label: ElementRef;
  public guardMessage: string;

  // login page -> show/hide password logic
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  passwordType = 'password';
  passwordVisibility = false;

  form: FormGroup;
  isSubmitted = false;

  // Subscriptions for unsubscribe in onDestroy lifecycle hook

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['login_again']) {
        this.guardMessage = 'Token has been expired, log in please'
      } else if (params['auth_failed']) {
        this.guardMessage = 'Login failed, please, log in again'
      }
    })
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.get('email').markAsTouched();
      this.form.get('password').markAsTouched();
    }
    this.isSubmitted = true;

    const user: User = {...this.form.value, returnSecureToken: true};
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.isSubmitted = false;
    }, error => {
      this.isSubmitted = false;
      this.alertService.danger(error.error.error.message)
    });
  }

  switchPasswordVisibility(): void {
    this.passwordType = this.passwordVisibility ? 'password' : 'text';
    this.passwordVisibility = !this.passwordVisibility;
  }
}
