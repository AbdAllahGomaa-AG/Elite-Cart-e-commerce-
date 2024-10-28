import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _Router = inject(Router);
  // validation
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  loginFormSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthenticationService.srtLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.successAlert('Sign in successfully');
          if (res.message === 'success') {
            //save token
            localStorage.setItem('loginToken', res.token);

            //decode
            this._AuthenticationService.saveData();

            //navigation to home
            this._Router.navigate(['/home']);
            console.log(res);
          }
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          this.failLogin('Incorrect email or password');
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  successAlert(id: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: id,
    });
  }
  failLogin(id: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: id,
    });
  }
}
