import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../core/interface/icart';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { IWishlist } from '../../core/interface/iwishlist';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  carWishlist: IWishlist[] = [];
  count!: number;

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);

  ngOnInit() {
    this._WishlistService.getCart().subscribe({
      next: (res) => {
        this.carWishlist = res.data;

        console.log(res.count);
        this.count = res.count;
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
  //
  deleteItem(id: string): void {
    this._WishlistService.RemoveItems(id).subscribe({
      next: (res) => {
        console.log(res);
        this.carWishlist = this.carWishlist.filter((item) => item._id !== id);
        this.alertRemove('remove item');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //
  addToCartCount(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.alertToAdd('Add to Cart');
        this.deleteItem(id);
        console.log('done');
      },
      error: (err) => {
        console.log('err');
      },
    });
  }
  //
  alertRemove(id: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      title: id,
    });
  }
  //
  alertToAdd(id: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
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
}
