import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/Products/products.service';
import { error } from 'console';
import { Iproduct } from '../../core/interface/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { ICategories } from '../../core/interface/icategories';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  //
  productList: Iproduct[] = [];
  CategoriesList: ICategories[] = [];
  regSubscribe!: Subscription;
  regSubscribeCategories!: Subscription;
  // inject
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _Router = inject(Router);
  // logic
  ngOnInit() {
    //call api Products
    this.regSubscribe = this._ProductsService.getallProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //call api Categories
    this.regSubscribeCategories = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.CategoriesList = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  // logOut
  ngOnDestroy() {
    this.regSubscribe?.unsubscribe();
    this.regSubscribeCategories?.unsubscribe();
  }

  ToProducts(): void {
    this._Router.navigate(['/products']);
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

  // slider
  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };
}
