import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICart } from '../../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  // inject
  private readonly _CartService = inject(CartService);
  // store data
  cartInfo: ICart = {} as ICart;
  //var
  numOfCartItems: number = 0;
  disabled: boolean = true;
  //call api
  ngOnInit() {
    this._CartService.gerToCart().subscribe({
      next: (res) => {
        this.cartInfo = res.data;
        this.numOfCartItems = res.numOfCartItems;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //delete
  deleteCartData(id: string): void {
    this._CartService.deleteCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartInfo = res.data;
        this.Sweat2();
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //  update
  updateCartUser(id: string, count: number): void {
    if (count > 0) {
      this._CartService.UpdateCount(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log("can't remove item");
    }
  }

  clearAllCartUser(): void {
    this._CartService.clearAllCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartInfo = {} as ICart;
        this._CartService.cartCounter.next(0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Sweat(): void {
    Swal.fire({
      title: 'Are you sure to delete all items?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearAllCartUser();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
  Sweat2(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      title: 'Item remove',
    });
  }
}
