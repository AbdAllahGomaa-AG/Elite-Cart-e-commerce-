import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TransalteService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let saveLang = localStorage.getItem('lang');
      this._TranslateService.setDefaultLang('eng');
      if (saveLang !== null) {
        this._TranslateService.use(saveLang!);
      }
      this.changeDirection();
    }
  }
  changeDirection(): void {
    let saveLang = localStorage.getItem('lang');

    if (localStorage.getItem('lang') === 'en') {
      // dir ltr
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);
      this._TranslateService.use(lang);
      this.changeDirection();
    }
  }
}
