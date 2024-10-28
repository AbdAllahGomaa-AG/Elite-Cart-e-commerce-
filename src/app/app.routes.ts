import { Routes } from '@angular/router';
import { authgardsGuard } from '../core/guards/authgards.guard';
import { loginguardesGuard } from '../core/guards/loginguardes.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [loginguardesGuard],
    loadComponent: () =>
      import('../layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('../components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../components/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'forget',
        loadComponent: () =>
          import(
            '../components/forget-password/forget-password.component'
          ).then((m) => m.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authgardsGuard],
    loadComponent: () =>
      import('../layout/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('../components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('../components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../components/cart/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('../components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('../components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('../components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../components/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
];
