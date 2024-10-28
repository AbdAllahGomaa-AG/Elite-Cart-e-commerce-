import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { ProductsService } from '../../core/services/Products/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { NgFor, NgIf } from '@angular/common';
import { IProductImage } from '../../core/interface/iproduct-image';
import { NgModel } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  detailsProducts: Iproduct = {} as Iproduct;

  productImage: IProductImage[] = [];
  // to get id
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  //
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let iProducts = p.get('id');
        console.log(iProducts);

        //call api
        this._ProductsService.getSpecificProducts(iProducts).subscribe({
          next: (res) => {
            if (!res) {
              console.log('No data returned from API');
            } else {
              this.detailsProducts = res.data;
              this.productImage = res.data.images;
              console.log(res.data);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  //add to cart
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
  //alert
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
}
