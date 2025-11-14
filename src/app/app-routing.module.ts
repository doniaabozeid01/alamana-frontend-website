import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AuthLayoutComponent } from './Components/Layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Components/Layouts/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { OffersComponent } from './Components/offers/offers.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { PreviousOrderComponent } from './Components/previous-order/previous-order.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WhoWeAreComponent } from './Components/who-we-are/who-we-are.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ContactComponent } from './Components/contact/contact.component';

const routes: Routes = [
  // {path:'login',component:LoginComponent}


  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // { path: 'register', component: RegisterComponent },
      // { path: 'resetPassword', component: ResetPasswordComponent },
      // { path: 'forgetpassword', component: ForgetPasswordComponent },
      // { path: 'changepassword', component: ChangePasswordComponent },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:categoryId', component: ProductsComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'checkout', component: PaymentsComponent },
      { path: 'previousorder', component: PreviousOrderComponent },
      { path: 'search', component: SearchComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'almana-is', component: WhoWeAreComponent },
      { path: 'contact', component: ContactComponent },
      // { path: 'advertise', component: AdvertiseCarouselComponent },
      // { path: 'main-categories', component: MainCategoriesComponent },
      // { path: 'rawMaterial-categories', component: RawMaterialCategoriesComponent },
      // { path: 'products', component: ProductsComponent },
      // { path: 'products/:id', component: ProductsComponent },
      // // { path: 'rawMaterialProducts/:categoryId', component: RawMaterialProductsComponent },
      // { path: 'rawMaterialProducts', component: RawMaterialProductsComponent },
      // { path: 'wishlist', component: FavouritsComponent, canActivate: [authGuard] },
      // { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
      // { path: 'rawmaterialdetails/:name', component: RawMaterialDetailsComponent },
      // { path: 'productdetails/:name', component: ProductDetailsComponent },
      // { path: 'cart', component: CartComponent, canActivate: [authGuard] },
      // { path: 'payment/pending', component: PaymentPendingComponent, canActivate: [authGuard] },
      // { path: 'allorders', component: AllordersComponent, canActivate: [authGuard] },
      // { path: 'aboutus', component: AboutComponent },
      // { path: 'confirm-email/:id', component: EmailConfirmationComponentComponent },           
      // { path: 'reject-email/:id', component: EmailConfirmationComponentComponent },
      // { path: 'payment/callback', component: PaymentCallbackComponent },

    ]
  },
  // optional fallback
  { path: '**', redirectTo: 'home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
