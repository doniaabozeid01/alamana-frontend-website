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
    items:1
  };

  product = {
    name: 'بلاتينيوم فيكس',
    category: {
      name: 'لاصق بلاط فاخر'
    },
    price: 2000,
    currency: 'جنيه',
    ingredients: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint expedita corrupti tempore earum voluptas atque, tempora quaerat fugit labore! Dolores quis unde ipsa voluptatem esse modi perspiciatis totam, obcaecati at soluta accusamus beatae iure quidem asperiores, eos corporis quod porro? Voluptates eos ex debitis ipsam eum quaerat dicta quis enim.',
    images: [
      'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png',
      'assets/random/16b1ca52598339b72e97aa96657cdf8e434815e5.png'
    ]
  };





  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }



  // product: any = null;
  cartId!: number;
  usreId!: string;


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




