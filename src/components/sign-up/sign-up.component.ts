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
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  //
  isLoading: boolean = false;
  private readonly _AuthenticationService = inject(AuthenticationService);
  // private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  // validation by FormBuilder
  // registerForm: FormGroup = this._FormBuilder.group(
  //   {
  //     name: [
  //       null,
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ],
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  //     rePassword: [null],
  //     phone: [
  //       null,
  //       [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
  //     ],
  //   },
  //   {
  //     validators: this.confirmPass, // Ensure binding the correct context
  //   }
  // );

  // validation
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPass
  );
  registerFormSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthenticationService
        .srtRegister(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.successAlert('Sign Up in successfully');
            if (res.message === 'success') {
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 1000);
            }
            console.log(res);
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPass(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  successAlert(id: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
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
}
