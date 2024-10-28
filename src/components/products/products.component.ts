import { Component, inject } from '@angular/core';
import { Iproduct } from '../../core/interface/iproduct';
import { ProductsService } from '../../core/services/Products/products.service';
import { Router, RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/Pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  productList: Iproduct[] = [];
  text: string = '';
  private readonly _ProductsService = inject(ProductsService);
  ngOnInit() {
    //call api Products
    this._ProductsService.getallProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.Sweat('Add To Cart');
        console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.Sweat('Add To Wishlist');
        console.log(res);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
  Sweat(mess: string): void {
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
      icon: 'success',
      title: mess,
    });
  }
}
