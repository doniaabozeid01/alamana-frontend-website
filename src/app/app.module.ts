import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvertiseSliderComponent } from './Components/HomeSections/advertise-slider/advertise-slider.component';
import { HomeComponent } from './Components/home/home.component';
import { AnimateOnActiveDirective } from './Components/shared/animate-on-active.directive';
import { CategoriesComponent } from './Components/HomeSections/categories/categories.component';
import { FeaturedProductsComponent } from './Components/HomeSections/featured-products/featured-products.component';
import { AdvertisementComponent } from './Components/HomeSections/advertisement/advertisement.component';
import { OneVideoComponent } from './Components/HomeSections/one-video/one-video.component';
import { RandomProductsComponent } from './Components/HomeSections/random-products/random-products.component';
import { ManyVideosComponent } from './Components/HomeSections/many-videos/many-videos.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './Components/Layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './Components/Layouts/auth-layout/auth-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { OffersComponent } from './Components/offers/offers.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { PreviousOrderComponent } from './Components/previous-order/previous-order.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvertiseSliderComponent,
    HomeComponent,
    AnimateOnActiveDirective,
    CategoriesComponent,
    FeaturedProductsComponent,
    AdvertisementComponent,
    OneVideoComponent,
    RandomProductsComponent,
    ManyVideosComponent,
    NavbarComponent,
    LoginComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    CartComponent,
    ProductsComponent,
    OffersComponent,
    FooterComponent,
    PaymentsComponent,
    PreviousOrderComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule
    , ReactiveFormsModule,   // ✅ مهم
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
