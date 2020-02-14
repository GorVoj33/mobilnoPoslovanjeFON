import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from '../model/vehicle.model';
import { Subscription } from 'rxjs';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit, OnDestroy {
  vehicles: Vehicle[];
  allVehicles: Vehicle[] = [];
  sub: Subscription;
  user: User;

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allVehicles = this.backend.getAllVehicles();
    this.vehicles = [...this.allVehicles];
    this.user = this.backend.getLoggedUser();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  goToDetails(veh){
    // console.log('Veh id : ', veh.id)
    this.router.navigate([`/vehicles/${veh.id}`]);
  }
  doFilter(filter) {
    var helpList: Vehicle[] = [];
    for(var veh of this.allVehicles) {
      if(veh.modelName.toLowerCase().includes(filter.toLowerCase()) || veh.manufacturer.toLowerCase().includes(filter.toLowerCase())) {
        helpList.push(veh);
      }
    }
    if (helpList.length > 0) {
      this.vehicles = helpList;
    }else {
      this.vehicles = this.allVehicles;
    }
    
  }
  goToOffers(){}
}
