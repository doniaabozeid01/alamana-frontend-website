import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';



@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.scss']
})
export class PreviousOrderComponent {

 orders: any;
  isLoggedIn: boolean = true;
  showScrollButton = false;

  constructor(private api: ApiService, private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.auth.getUserId().subscribe({
      next: (res) => {
        console.log(res);

        if (!res?.userId) {
          this.isLoggedIn = false;
          return;
        }

        this.api.GetOrdersByUserId(res.userId).subscribe({
          next: (response) => {
            console.log(response);
            
            this.orders = response.sort((a: any, b: any) => b.orderId - a.orderId);
          },
          error: (err) => {
            console.log(err);
            this.orders = [];
          }
        });
      },
      error: (err) => {
        this.isLoggedIn = false;
        console.log("User not logged in:", err);
      }
    });
  }




  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-dark';      // أصفر
      case 'confirmed':
        return 'bg-info text-white';        // أزرق فاتح
      case 'shipped':
        return 'bg-primary text-white';     // أزرق غامق
      case 'delivered':
        return 'bg-success text-white';     // أخضر
      case 'canceled':
        return 'bg-danger text-white';      // أحمر
      default:
        return 'bg-secondary text-white';   // رمادي افتراضي
    }
  }



  goToLogin() {
    this.route.navigate(["/auth/login"]);
  }



  goToProducts() {
    this.route.navigate(["/products"]);
  }
 @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollPosition > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

