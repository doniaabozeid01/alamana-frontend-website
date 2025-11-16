import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-random-products',
  templateUrl: './random-products.component.html',
  styleUrls: ['./random-products.component.scss']
})
export class RandomProductsComponent {
  userId!: string;



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
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
    // public languageService: LanguageService,


  ) { }


  goToProducts(id: number) {
    this.router.navigate(['products', id]);
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





    this.api.GetRandomProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res;
        // this.toastr.success('تم اضافه المنتج الي السله بنجاح');

      },
      error: (err) => {
        console.log(err);
        // this.toastr.error('حدث خطأ ما الرجاء المحاوله لاحقاً');

      }
    })

  }

  @ViewChild('catCarousel', { static: false }) catCarousel!: CarouselComponent;

  dragging = false;


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
        // this.cartId = res.id
        console.log(res);
        this.toastr.success('تم اضافه المنتج الي السله بنجاح');
        // this.toastr.success("Great choice! It's now in your cart.");
      },

      error: (err) => {
        // this.toastr.warning(err.error.message);
        this.toastr.error('حدث خطأ ما الرجاء المحاوله لاحقاً');
        console.log(err);
      }
    });



  }


}
