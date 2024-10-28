import { Component, inject } from '@angular/core';
import { TransalteService } from '../../core/services/translate/transalte.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FlowbiteServiceService } from '../../core/services/flowbite-service.service';

@Component({
  selector: 'app-nav-top',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './nav-top.component.html',
  styleUrl: './nav-top.component.scss',
})
export class NavTopComponent {
  //
  private readonly _TransalteService = inject(TransalteService);
  constructor(private _FlowbiteServiceService: FlowbiteServiceService) {}

  readonly _TranslateService = inject(TranslateService);
  //
  change(id: string): void {
    this._TransalteService.changeLang(id);
  }

  ngOnInit(): void {
    this._FlowbiteServiceService.loadFlowbite((Flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', Flowbite);
    });
  }
}
