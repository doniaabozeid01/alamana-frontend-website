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



  categories: any;





  products :any;


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


  selectedId = 1;

  trackById = (_: number, x: any) => x.id;

  selectCategory(id:number) {
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
