import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  //
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _rou = inject(Router);
  step: number = 1;
  //
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[0-9]{6}/),
    ]),
  });
  verifyNewPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  EmailRest(): void {
    let emailVer = this.verifyEmail.get('email')?.value;
    this.verifyNewPassword.get('email')?.patchValue(emailVer);
    this._AuthenticationService.setEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  CodeRest(): void {
    this._AuthenticationService.setCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  RestEp(): void {
    this._AuthenticationService
      .setRest(this.verifyNewPassword.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._rou.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
