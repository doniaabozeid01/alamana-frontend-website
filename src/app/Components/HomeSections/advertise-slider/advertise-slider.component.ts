import { Component } from '@angular/core';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-advertise-slider',
  templateUrl: './advertise-slider.component.html',
  styleUrls: ['./advertise-slider.component.scss']
})
export class AdvertiseSliderComponent implements AfterViewInit, OnDestroy {
  /**
   * اسم الكلاس الذي يحدد إن السلايد Active.
   * - Bootstrap: 'active'
   * - Swiper: 'swiper-slide-active'
   */
  @Input('appAnimateOnActive') activeClass: string = 'active';

  /**
   * مدة التأخير بين العناصر (بالثواني)
   */
  @Input() animStagger = 0.2;

  private mo?: MutationObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // تشغيل أولي لو السلايد بدأ Active
    this.applyAnimation(this.isActive());

    // راقب تغيّر الكلاسات
    this.mo = new MutationObserver(() => {
      this.applyAnimation(this.isActive());
    });

    this.mo.observe(this.host.nativeElement, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy(): void {
    this.mo?.disconnect();
  }

  private isActive(): boolean {
    return this.host.nativeElement.classList.contains(this.activeClass);
  }

  private applyAnimation(active: boolean) {
    const animEls = this.host.nativeElement.querySelectorAll<HTMLElement>('.animate-on-slide');

    if (!animEls.length) return;

    if (!active) {
      // نظّف قبل ما تخرج السلايد
      animEls.forEach(el => {
        el.classList.remove('show');
        el.style.transitionDelay = '';
      });
      return;
    }

    // فعّل الأنيميشن مع Stagger
    animEls.forEach((el, idx) => {
      el.classList.remove('show');
      el.style.transitionDelay = `${idx * this.animStagger}s`;
      // reflow لضمان إعادة التشغيل
      void el.offsetWidth;
      el.classList.add('show');
    });
  }
}