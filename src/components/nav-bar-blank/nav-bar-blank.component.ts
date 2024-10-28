import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { FlowbiteServiceService } from '../../core/services/flowbite-service.service';

@Component({
  selector: 'app-nav-bar-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavTopComponent, TranslateModule],
  templateUrl: './nav-bar-blank.component.html',
  styleUrl: './nav-bar-blank.component.scss',
})
export class NavBarBlankComponent implements OnInit {
  constructor(private _FlowbiteServiceService: FlowbiteServiceService) {}
  counter: number = 0;
  private readonly _Authentication = inject(AuthenticationService);
  private readonly _CartService = inject(CartService);

  ngOnInit() {
    // flow
    this._FlowbiteServiceService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    //
    this._CartService.gerToCart().subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
    });
    this._CartService.cartCounter.subscribe({
      next: (res) => {
        this.counter = res;
      },
    });
  }
  singOutNav(): void {
    this._Authentication.singOut();
  }
}
