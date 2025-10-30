import { Directive } from '@angular/core';
import { AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAnimateOnActive]'
})
export class AnimateOnActiveDirective implements AfterViewInit, OnDestroy {
  /** الكلاس اللي بيمثل السلايد الـ Active (Bootstrap: 'active' / Swiper: 'swiper-slide-active') */
  @Input('appAnimateOnActive') activeClass: string = 'active';

  /** تأخير بين العناصر بالثواني */
  @Input() animStagger = 0.2;

  private mo?: MutationObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.applyAnimation(this.isActive());
    this.mo = new MutationObserver(() => this.applyAnimation(this.isActive()));
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
      animEls.forEach(el => { el.classList.remove('show'); el.style.transitionDelay = ''; });
      return;
    }

    animEls.forEach((el, idx) => {
      el.classList.remove('show');
      el.style.transitionDelay = `${idx * this.animStagger}s`;
      void el.offsetWidth; // reflow لضمان إعادة التشغيل
      el.classList.add('show');
    });
  }
}