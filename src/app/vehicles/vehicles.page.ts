import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from '../model/vehicle.model';
import { Subscription } from 'rxjs';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { NavController, AlertController } from '@ionic/angular';

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
  userLoggedIn = false;

  constructor(
    public backend: BackendService,
    private router: Router,
    private nav: NavController,
    private alert: AlertController
  ) {
        // this.router.routeReuseStrategy.shouldReuseRoute = function() {
        //   return false;
        // };

   }

  ngOnInit() {
    console.log('init vehicles')
    this.allVehicles = this.backend.getAllVehicles();
    this.vehicles = [...this.allVehicles];
    this.user = this.backend.getLoggedUser();
  }
  ngOnDestroy() {
    //this.sub.unsubscribe();
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
  goToOffers() {}

  createNew() {
    this.router.navigate(['/vehicles/vehicle-create']);
    //this.nav.navigateRoot(['/vehicles/vehicle-create']);
  }
  edit (vehicle) {
    this.router.navigate([`/vehicles/vehicle-edit/${vehicle.id}/edit`]);
    //this.nav.navigateRoot(['/vehicles/vehicle-create']);
  }

  ionViewWillEnter(){
    this.user = this.backend.getLoggedUser();
    if(this.user.email !== '') {
      this.userLoggedIn = true;
    }
    console.log('ION VIEW WILL ENTER vehicles')
    this.allVehicles = this.backend.getAllVehicles();
    this.vehicles = [...this.allVehicles];
  }
  async logout() {
    var success = this.backend.logout();
    var myMessage = '';
    if(success) {
      myMessage = 'Successfully logged out!';
      //this.router.navigate(['/home']);
    }
    else {
      myMessage = 'Error while logging out...';
    }
    const alert = await this.alert.create(
      {
        header: 'Info',
        message: myMessage,
        buttons: [{
          text: 'OK',
          handler: (click) => {
            if (success) {
              this.router.navigate(['/home']);
            }
          } }]
      }
    );
    await alert.present();
    
  }
}
