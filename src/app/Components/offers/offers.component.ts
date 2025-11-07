import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  promos :any;

  trackById = (_: number, x: any) => x.id;



  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.GetAllAdvertisements().subscribe({
      next: (response) => {
        console.log(response);
        this.promos = response;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
