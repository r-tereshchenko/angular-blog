import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

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

  // boolean flags for adding class on inputs on (focus) || (blur)
  isEmailFocused = false;
  isPasswordFocused = false;

  form: FormGroup;
  isSubmitted = false;

  // Subscriptions for unsubscribe in onDestroy lifecycle hook

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['login_again']) {
        this.guardMessage = 'Please, log in'
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
      console.log('Login-page Error: ', error);
      this.isSubmitted = false;
    });
  }

  switchPasswordVisibility(): void {
    this.passwordType = this.passwordVisibility ? 'password' : 'text';
    this.passwordVisibility = !this.passwordVisibility;
  }

  onFocus(input): void {
    if (input === 'email') {
      this.isEmailFocused = true;
    } else {
      this.isPasswordFocused = true;
    }
  }

  onBlur(val): void {
    if (val === 'email' && !this.form.get('email').value?.length) {
      this.isEmailFocused = false;
    } else if (val === 'password' && !this.form.get('password').value?.length) {
      this.isPasswordFocused = false;
    }
  }
}
