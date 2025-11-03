import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// لو عندك LanguageService أصلاً خلي الحقن شغال، ولو مش موجود احذفيه من الكونستركتور والـHTML
// import { LanguageService } from 'src/app/services/language.service';

interface CartItem {
  id: number;
  productId?: number;
  name: string;           // الاسم بالإنجليزي
  name_ar?: string;       // الاسم بالعربي
  imagePath: string;
  price: number;          // سعر الوحدة
  currency: string;       // العملة EN
  currency_ar?: string;   // العملة AR
  quantity: number;
  optionsText?: string;
  optionsTextAr?: string;
  totalPrice?: number;    // بيتحسب = price * quantity
}

interface Cart {
  cartItems: CartItem[];
}

const CART_KEY = 'cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart | null = { cartItems: [] };
  isRtl = document?.documentElement?.dir === 'rtl';

  // لو عندك LanguageService فعلاً، سيبيه متحقنًا
  constructor(
    private router: Router,
    // public languageService: LanguageService
  ) {}

ngOnInit(): void {
  this.cart = {
    cartItems: [
      {
        id: 1,
        productId: 101,
        name: 'Platinum Fix',
        name_ar: 'بلاتينيوم فيكس',
        imagePath: 'assets/products/platinum-fix.jpg',
        price: 2000,
        currency: 'EGP',
        currency_ar: 'جنيه',
        quantity: 1,
        totalPrice: 2000,
      },
      {
        id: 2,
        productId: 102,
        name: 'M-Fix Waterproof',
        name_ar: 'إم فيكس ضد الماء',
        imagePath: 'assets/products/mfix.jpg',
        price: 850,
        currency: 'EGP',
        currency_ar: 'جنيه',
        quantity: 2,
        totalPrice: 1700,
      },
      {
        id: 3,
        productId: 103,
        name: 'Sealatex 3031',
        name_ar: 'سيلا تاكس 3031',
        imagePath: 'assets/products/sealatex.jpg',
        price: 1200,
        currency: 'EGP',
        currency_ar: 'جنيه',
        quantity: 1,
        totalPrice: 1200,
      }
    ],
  };
}

  

  /** حفظ السلة في localStorage */
  private persist(): void {
    if (!this.cart) this.cart = { cartItems: [] };
    // إعادة حساب الإجماليات قبل الحفظ
    this.cart.cartItems = this.cart.cartItems.map((it) => this.normalizeItem(it));
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
  }

  /** توحيد بنية الآيتم + حساب الإجمالي */
  private normalizeItem(item: CartItem): CartItem {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const price = Math.max(0, Number(item.price) || 0);
    const total = +(price * qty).toFixed(2);
    return {
      ...item,
      quantity: qty,
      price,
      totalPrice: total,
      name: item.name ?? '',
      currency: item.currency ?? '',
      imagePath: item.imagePath ?? '',
    };
  }

  /** جمع Subtotal */
  getSubtotal(): number {
    if (!this.cart?.cartItems?.length) return 0;
    const sum = this.cart.cartItems.reduce((acc, it) => acc + (it.totalPrice || 0), 0);
    return +sum.toFixed(2);
  }

  /** تعديل الكمية (لو وصلت 0 بيتم الحذف) */
  updateQuantity(item: CartItem, newQty: number): void {
    if (!this.cart) return;
    const list = this.cart.cartItems;

    // سقف منطقي للكمية
    const qty = Math.max(0, Math.min(999, Math.floor(newQty || 0)));

    if (qty <= 0) {
      // حذف
      this.cart.cartItems = list.filter((x) => x.id !== item.id);
    } else {
      // تحديث
      this.cart.cartItems = list.map((x) =>
        x.id === item.id ? this.normalizeItem({ ...x, quantity: qty }) : x
      );
    }

    this.persist();
  }

  /** حذف عنصر */
  deleteItem(id: number): void {
    if (!this.cart) return;
    this.cart.cartItems = this.cart.cartItems.filter((x) => x.id !== id);
    this.persist();
  }

  /** trackBy للأداء */
  trackById = (_: number, item: CartItem) => item.id;

  /** تنقل لصفحة الدفع */
  goToCheckout(): void {
    // عدلي المسار حسب مشروعك
    this.router.navigate(['/payment']);
  }

  /** تنقل لصفحة المنتجات */
  goToProducts(): void {
    // عدلي المسار حسب مشروعك
    this.router.navigate(['/products']);
  }
}
