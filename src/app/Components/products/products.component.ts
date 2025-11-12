import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private router: Router, private api: ApiService, private auth: AuthService) { }



  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    nav: false,                 // بنستخدم أزرار خارجية
    rtl: true,
    items: 1
  };

  cartId!: number;

  // مثال: products.component.ts
  selectedId = 0;

  categories: any;

  products: any;

  // (اختياري) لو محتاج دوال بسيطة
  // trackById = (_: number, item: any) => item.id;


  trackByIndex(index: number) {
    return index;
  }

  userId!: string;



  ngOnInit() {


    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      this.auth.getUserId().subscribe({
        next: (response) => {
          console.log(response);

          this.userId = response.userId;

        },
        error: (err) => {
          console.log(err);

        }

      });
    }



    this.api.GetAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.selectedId = response[0].id;
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
        // console.log(response.products[0].galleryUrls);
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


















  addToCart(data: any, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    const dataToAdded = {
      quantity: 1,
      productId: data.id,
      userId: this.userId,
    };

    console.log(dataToAdded);

    this.api.addToCart(dataToAdded).subscribe({
      next: (res) => {
        this.cartId = res.id
        console.log(res);

        // this.toastr.success("Great choice! It's now in your cart.");
      },

      error: (err) => {
        // this.toastr.warning(err.error.message);

        console.log(err);
      }
    });



  }
}
