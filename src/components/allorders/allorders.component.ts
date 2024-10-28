import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from '../../core/services/Orders/orders.service';
import { Ihorrder } from '../../core/interface/ihorrder';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  userData: any = null;
  id: any = '';
  ordersH: Ihorrder[] = [];
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _OrdersService = inject(OrdersService);
  idAllorders: any = '';

  ngOnInit() {
    if (localStorage.getItem('loginToken') != null) {
      this.userData = jwtDecode(localStorage.getItem('loginToken')!);
      this.id = this.userData.id;
      console.log(this.id);
    }
    this._OrdersService.getUserOrders(this.id).subscribe({
      next: (res: Ihorrder[]) => {
        this.ordersH = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
