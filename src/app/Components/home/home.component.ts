import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  advertisements = [
    {
      imageUrl: '../../../assets/HOME 1 MOBILE.png'
    },
    {
      imageUrl: '../../../assets/loga website-04 (2).png'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    // navText: ['<i class="bi bi-chevron-left"></i>','<i class="bi bi-chevron-right"></i>'], // أو FontAwesome
    rtl: true,
    items: 1,
    autoHeight: false

  };


  constructor() { }



  // trackById = (_: number, item: any) => item.id ?? item.imageUrl;
}
