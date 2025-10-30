import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
promos = [
    {
      id: 1,
      discount: 20,
      product: '../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png', // صورة المنتجات
      title: 'احصل على خصم 20% على جميع منتجات Platinum Fix لفترة محدودة!',
      text: 'اختيارك الأمثل للجودة والقوة بأفضل سعر في السوق.'
    },
    {
      id: 2,
      discount: 20,
      product: '../../../assets/advertisement/37d80afb3ea66c625a2fdcf3860ec1522508fb8f.png',
      title: 'خصم 20% على Platinum Fix',
      text: 'قوة التصاق ممتازة ومقاومة للرطوبة — عرض لا يُفوت!'
    }
  ];

  trackById = (_: number, x: any) => x.id;
}
