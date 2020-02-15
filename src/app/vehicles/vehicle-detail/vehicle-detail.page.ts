import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BackendService } from 'src/app/service/backend.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit {

  vehicle: Vehicle;
  userLoggedIn = false;
  user: User = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrl: NavController,
    private backend: BackendService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('vehicleID')) {
          this.ctrl.navigateBack('/vehicles');
          return;
        }
        let id = paramMap.get('vehicleID');
        this.vehicle = this.backend.getAllVehicles().find(v => 
          v.id === id
        );
        //console.log('id '+id)
        
        //console.log('Vehicle: '+this.vehicle);
      }
    );
    this.user = this.backend.getLoggedUser();
    if (this.user) {
      this.userLoggedIn = true;
    }
  }

  onAddReview(vehicle: Vehicle) {
    this.router.navigate([`/vehicles/${vehicle.id}/review-create`]);
  }
  goToAuth() {
    this.router.navigate(['/home']);
  }

}
