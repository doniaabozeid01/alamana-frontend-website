import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent {
  advertisements: any[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    rtl: true,
    autoHeight: false,
    margin: 30,
    stagePadding: 100,
    responsive: {
      0: {
        items: 1,           // 👈 صورة واحدة فقط
        stagePadding: 0,    // 👈 مافيش جزء باين من الصورة اللي بعدها
        margin: 20          // 👈 بدون مسافة بين الصور
      },
      768: { items: 1, stagePadding: 60, margin: 20 },
      1200: { items: 1, stagePadding: 100, margin: 30 }
    }
  };


  constructor() { }

  ngOnInit() {
    this.advertisements = [
      {
        image: '../../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png'
      },
      {
        image: '../../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png'
      },
      {
        image: '../../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png'
      },
      {
        image: '../../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png'
      }
    ];
  }

  trackById = (_: number, item: any) => item.id ?? item.imageUrl;
}
