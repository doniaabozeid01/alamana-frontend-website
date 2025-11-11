import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-random-products',
  templateUrl: './random-products.component.html',
  styleUrls: ['./random-products.component.scss']
})
export class RandomProductsComponent {
  isRtl = document.documentElement.dir === 'rtl';

  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    nav: false,                 // بنستخدم أزرار خارجية
    rtl: true,
    navText: ['<i class="fa-solid fa-chevron-right"></i>', '<i class="fa-solid fa-chevron-left"></i>'],

    responsive: {
      0: { items: 1 },   // موبايل: عنصر واحد
      700: { items: 2 },   // موبايل: عنصر واحد
      1200: { items: 4 }   // شاشات كبيرة: 4 عناصر
    }
  };

  trackById = (_: number, cat: any) => cat.id;


  products: any;
  constructor(
    private api: ApiService,
    private router: Router,
    // public languageService: LanguageService,


  ) { }


  goToProducts(id: number) {
    this.router.navigate(['products', id]);
  }


  ngOnInit() {
    this.api.GetRandomProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.products = res;

      },
      error:(err)=>{
        console.log(err);

      }
    })


    this.products = [
      {
        name: 'بلاتينيوم فيكس',
        image: '../../../../assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
        newPrice: 100,
        oldPrice: 120,
        currency: 'دينار',
        weight: 20,
        weightData: 'كيلو'
      },
      {
        name: 'بلاتينيوم فيكس',
        image: '../../../../assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
        newPrice: 100,
        oldPrice: 120,
        currency: 'دينار',
        weight: 20,
        weightData: 'كيلو'
      },
      {
        name: 'بلاتينيوم فيكس',
        image: '../../../../assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
        newPrice: 100,
        oldPrice: 120,
        currency: 'دينار',
        weight: 20,
        weightData: 'كيلو'
      },

      {
        name: 'بلاتينيوم فيكس',
        image: '../../../../assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
        newPrice: 100,
        oldPrice: 120,
        currency: 'دينار',
        weight: 20,
        weightData: 'كيلو'
      }, {
        name: 'بلاتينيوم فيكس',
        image: '../../../../assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
        newPrice: 100,
        oldPrice: 120,
        currency: 'دينار',
        weight: 20,
        weightData: 'كيلو'
      },

    ];



  }
  @ViewChild('catCarousel', { static: false }) catCarousel!: CarouselComponent;



  private ptrMoved = false;







  dragging = false;

  private ptrStart?: { x: number; y: number };
  private moved = false;
  private readonly DRAG_THRESHOLD = 10; // px

  onPtrDown(e: PointerEvent) {
    this.ptrStart = { x: e.clientX, y: e.clientY };
    this.moved = false;
  }

  onPtrMove(e: PointerEvent) {
    if (!this.ptrStart) return;
    const dx = Math.abs(e.clientX - this.ptrStart.x);
    const dy = Math.abs(e.clientY - this.ptrStart.y);
    if (dx > this.DRAG_THRESHOLD || dy > this.DRAG_THRESHOLD) this.moved = true;
  }

  onPtrUp() {
    // بس بنفضّي الحالة
    this.ptrStart = undefined;
  }

  onPtrCancel() {
    this.ptrStart = undefined;
    this.moved = false;
  }

  onCardClick(id: number, e: MouseEvent) {
    // لو كان فيه سحب (من owl) أو تحرّك فوق العتبة → امنع الكليك
    if (this.dragging || this.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.goToProducts(id);
  }

}
