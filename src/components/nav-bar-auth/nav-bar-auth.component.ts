import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar-auth.component.html',
  styleUrl: './nav-bar-auth.component.scss'
})
export class NavBarAuthComponent {

}
