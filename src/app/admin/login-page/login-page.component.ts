import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../shared/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('label', {static: false}) label: ElementRef;

  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  isEmailFocused = false;
  isPasswordFocused = false;

  passwordType = 'password';
  passwordVisibility = false;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
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
    return this.form.get('email')
  }

  get passwordControl() {
    return this.form.get('password')
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.get('email').markAsTouched()
      this.form.get('password').markAsTouched()
    }
    this.isSubmitted = true

    const user: User = {...this.form.value, returnSecureToken: true};
    this.auth.login(user)
      .subscribe((response) => {
        this.isSubmitted = false
        this.router.navigate(['/admin', 'dashboard'])
      }, error => {
        this.isSubmitted = false
        console.log('Err: ', error)
      })
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
    if (val === 'email' && !this.form.get('email').value.length) {
      this.isEmailFocused = false;
    } else if (val === 'password' && !this.form.get('password').value.length) {
      this.isPasswordFocused = false;
    }
  }
}
