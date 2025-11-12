import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/Services/api.service';

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
  usreId!: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', id);

    this.api.GetProductById(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.product=response;
      }
    })
  }

















  addToCart(product: any): void {

    const payload = {
      quantity: 1,
      productId: product.id,
      userId: this.usreId,
    };

    console.log(payload);

    const token = localStorage.getItem('token');
    if (!token) {
      // لو لازم تسجّل قبل الإضافة على السيرفر:
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    // 4) الاتصال بالـ API
    this.api.AddCartItem(payload).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}




