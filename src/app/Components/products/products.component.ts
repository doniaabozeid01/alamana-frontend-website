import { Component, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {




  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    nav: false,                 // بنستخدم أزرار خارجية
    rtl: true,
    items: 1
  };

  // مثال: products.component.ts
  selectedId = 1;

  categories = [
    { id: 1, name: 'لواصق' },
    { id: 2, name: 'عوازل' },
    { id: 3, name: 'مواد إنشائية' },
    { id: 4, name: 'ملاطات' },
    { id: 5, name: 'دهانات' },
    { id: 6, name: 'معالجات رطوبة' },
    { id: 7, name: 'مواد إصلاح' },
    { id: 8, name: 'إكسسوارات بلاط' },
  ];

  products = [
    {
      id: 101,
      categoryId: 1,
      name: 'بلاتينيوم فيكس C2TE',
      weight: 25, weightData: 'كجم',
      oldPrice: 2300, newPrice: 2000, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      ],
      isNew: true
    },
    {
      id: 102,
      categoryId: 1,
      name: 'بلاتينيوم فيكس فليكس',
      weight: 20, weightData: 'كجم',
      oldPrice: 2150, newPrice: 1890, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',

      ]
    },
    {
      id: 201,
      categoryId: 2,
      name: 'أم فيكس عازل رطوبة',
      weight: 18, weightData: 'كجم',
      oldPrice: 2600, newPrice: 2290, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',

      ],
      isNew: true
    },
    {
      id: 202,
      categoryId: 2,
      name: 'عازل أكريليك مرن',
      weight: 20, weightData: 'كجم',
      oldPrice: 2400, newPrice: 2100, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      ]
    },
    {
      id: 301,
      categoryId: 3,
      name: 'مونة إصلاح فورية',
      weight: 25, weightData: 'كجم',
      oldPrice: 1800, newPrice: 1650, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',

      ]
    },
    {
      id: 302,
      categoryId: 3,
      name: 'خرسانة جافة عالية القوة',
      weight: 30, weightData: 'كجم',
      oldPrice: 3200, newPrice: 2950, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      ]
    },
    {
      id: 401,
      categoryId: 4,
      name: 'ملاط تسوية أرضيات',
      weight: 20, weightData: 'كجم',
      oldPrice: 1700, newPrice: 1490, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      ]
    },
    {
      id: 501,
      categoryId: 5,
      name: 'دهان أساس إيبوكسي',
      weight: 5, weightData: 'كجم',
      oldPrice: 1900, newPrice: 1690, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',

      ]
    },
    {
      id: 601,
      categoryId: 6,
      name: 'مانع تسرب شقوق',
      weight: 1, weightData: 'لتر',
      oldPrice: 450, newPrice: 399, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',

      ]
    },
    {
      id: 801,
      categoryId: 8,
      name: 'فواصل بلاط + مساطر',
      weight: 0.5, weightData: 'كجم',
      oldPrice: 250, newPrice: 199, currency: 'ج.م',
      galleryUrls: [
        'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      ]
    }
  ];

  // (اختياري) لو محتاج دوال بسيطة
  trackById = (_: number, item: any) => item.id;




  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.GetAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response);
        this.getProductsByCategoryId(response[0].id)
      }
    })
  }



  selectCategory(id: number) {
    this.selectedId = id;
    // لو عايز تربط بفلترة المنتجات:
    // this.filterByCategory.emit(id);
    this.getProductsByCategoryId(id);
  }



  getProductsByCategoryId(id: number) {
    this.api.GetCategoryWithProductsById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.products;
      }
    })
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
    // this.goToProducts(id);
  }
}
