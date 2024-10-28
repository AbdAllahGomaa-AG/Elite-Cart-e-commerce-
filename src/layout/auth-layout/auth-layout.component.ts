import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarAuthComponent } from "../../components/nav-bar-auth/nav-bar-auth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarAuthComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
