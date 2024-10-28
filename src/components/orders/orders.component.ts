import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { OrdersService } from '../../core/services/Orders/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  //inject
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  // var
  catId: string | null = '';
  // get id
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.catId = params.get('id');
        console.log(params);
      },
    });
  }

  orderDet: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required),
  });

  orderDetSubmit(): void {
    if (this.orderDet.valid) {
      this._OrdersService
        .orderCheck(this.catId, this.orderDet.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }else{
       this.orderDet.setErrors({ mismatch: true });
       this.orderDet.markAllAsTouched();
    }
  }
}
