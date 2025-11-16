import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  catOptions: OwlOptions = {
    loop: false,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    // nav: true,                 // بنستخدم أزرار خارجية
    rtl: true,
    items: 1
  };


  product: any = null;
  cartId!: number;
  userId!: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService

  ) { }


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




    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', id);

    this.api.GetProductById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response;
      }
    })
  }

















  addToCart(product: any): void {

    const payload = {
      quantity: 1,
      productId: product.id,
      userId: this.userId,
    };

    console.log(payload);

    const token = localStorage.getItem('token');
    if (!token) {
      // لو لازم تسجّل قبل الإضافة على السيرفر:
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    // 4) الاتصال بالـ API
    this.api.addToCart(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('تم اضافه المنتج الي السله بنجاح');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('حدث خطأ ما الرجاء المحاوله لاحقاً');
      }
    });
  }



}




