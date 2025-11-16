import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  searchTerm: string = '';
  cartId!: number;
  userId!: string;


  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    nav: false,                 // بنستخدم أزرار خارجية
    rtl: true,
    items: 1
  };

  products: any;



  constructor(private router: Router, private api: ApiService, private auth: AuthService, private toastr: ToastrService) {

  }
  

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


    this.api.GetAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response;

      }
    })
  }

  // products.component.ts
  imageSlides(product: any) {
    return (product?.galleryUrls ?? [])
      .filter((m: any) => m?.url && (m?.type ?? '').toLowerCase() === 'image');
  }

  trackByIndex(i: number) { return i; } // أو trackByUrl = (_:number, m:any)=> m.url;


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
        this.toastr.success('تم اضافه المنتج الي السله بنجاح');
        // this.toastr.success("Great choice! It's now in your cart.");
      },

      error: (err) => {
        // this.toastr.warning(err.error.message);
        this.toastr.error('حدث خطأ ما الرجاء المحاوله لاحقًا');
        console.log(err);
      }
    });



  }





}
