import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle.model';
import { User } from '../model/user.model';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.page.html',
  styleUrls: ['./my-reviews.page.scss'],
})
export class MyReviewsPage implements OnInit {
  vehicles: Vehicle[] = [];
  myVehicles: Vehicle[] = [];
  user: User = null;
  
  constructor(
    public backend: BackendService,
    private router: Router
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
  }

  ngOnInit() {
    this.backend.populateLists(this.vehicles, this.myVehicles);
    this.user = this.backend.getLoggedUser();
    console.log('stigle liste')
    console.log(this.vehicles)
    console.log(this.myVehicles)
  }
  goToDetails(veh){
    this.router.navigate([`/vehicles/${veh.id}`]);
  }
  edit(vehicle){
    this.router.navigate([`/vehicles/vehicle-edit/${vehicle.id}/edit`]);
  }
}
