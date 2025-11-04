import { Component, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  searchTerm: string = '';


  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    nav: false,                 // بنستخدم أزرار خارجية
    rtl: true,
    items: 1
  };

  products:any;



  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.GetAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response;

      }
    })
  }



  // filteredProducts = [...this.products]; 

  selectedId = 1;

  trackById = (_: number, x: any) => x.id;

  selectCategory(c: { id: number, label: string }) {
    this.selectedId = c.id;
    // لو عايز تربط بفلترة المنتجات:
    // this.filterByCategory.emit(c.id);
  }



  filterProducts() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      // this.filteredProducts = [...this.products];
    } else {
      // this.filteredProducts = this.products.filter(p =>
        // p.name.toLowerCase().includes(term)
      // );
    }
  }


  @ViewChild('catCarousel', { static: false }) catCarousel!: CarouselComponent;










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
