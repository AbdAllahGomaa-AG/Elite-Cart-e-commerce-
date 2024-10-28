import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarBlankComponent } from "../../components/nav-bar-blank/nav-bar-blank.component";
import { NavTopComponent } from "../../components/nav-top/nav-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarBlankComponent, NavTopComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {}
