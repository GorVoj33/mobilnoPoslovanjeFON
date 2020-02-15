import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle.model';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { BackendService } from 'src/app/service/backend.service';
import { CameraPhoto, Capacitor, Plugins, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.page.html',
  styleUrls: ['./vehicle-edit.page.scss'],
})
export class VehicleEditPage implements OnInit {
  vehicle: Vehicle;
  userLoggedIn = false;
  user: User = null;
  chosenImg: any;
  imgChanged = false;
  createdPhoto: CameraPhoto = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrl: NavController,
    private backend: BackendService,
    private alert: AlertController
  ) { }

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
  async onSubmitForm(forma){
    var model = forma.value.model;
    if (model !== '') {
      this.vehicle.modelName = model;
    }
    var manufacturer = forma.value.manufacturer;
    if (manufacturer !== '') {
      this.vehicle.manufacturer = manufacturer;
    }
    var year = forma.value.year;
    if (year !== '') {
      this.vehicle.yearOfProduction = year;
    }
    var desc = forma.value.desc;
    if (desc !== '') {
      this.vehicle.desc = desc;
    }
    var date = forma.value.date;
    if (date !== '') {
      this.vehicle.availableFrom = date;
    }
    if(this.imgChanged) {
      this.vehicle.imgUrl = this.chosenImg;
      this.vehicle.photo = this.createdPhoto;
    }
    this.backend.updateVehicle(this.vehicle);
    const alert = await this.alert.create(
      {
        header: 'Info',
        message: 'Your offer has been successfully updated. Thank you.',
        buttons: [{
          text: 'OK',
          handler: (click) => {
            this.router.navigate(['/vehicles']);
            //this.nav.navigateRoot('/vehicles');
            //this.router.navigate(['/vehicles-reload']);
          } }]
      }
    );
    await alert.present();
    
    // this.backend.saveVehicle(vehicle).subscribe(
    //   response => {
    //     vehicle.id = response.name;
    //     this.backend.updateVehicle(vehicle).subscribe(
    //       res => {
    //         console.log('sve ok sacuvano');
    //         console.log(res);
    //       }
    //     );
    //   }
    // );
    
  }

  onChooseImg(imgPath) {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 70,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 350,
      width: 200,
      resultType: CameraResultType.Uri
      //resultType: CameraResultType.Base64
    }).then(
      image => {
        this.chosenImg = image.webPath;
        this.createdPhoto = image;
        this.imgChanged = true;
        //var veh = new Vehicle('vehId', mode)
      });
    
  }
  async delete(vehicle){

    const alert = await this.alert.create(
      {
        header: 'IMPORTANT!',
        message: `Are you sure to delete this offer for ${vehicle.manufacturer} ${vehicle.modelName}?`,
        buttons: [{
          text: 'YES, DELETE IT',
          handler: (click) => {
            this.finallyDeleteOffer(vehicle);
            // this.router.navigate(['/vehicles']);
            //this.nav.navigateRoot('/vehicles');
            //this.router.navigate(['/vehicles-reload']);
          }
        },
        {
          text: 'Cancel'
        }]
      }
    );
    await alert.present();


    // if(confirm(`Are you sure to delete this offer for ${vehicle.manufacturer} ${vehicle.modelName}?`)) {
    //   this.backend.deleteVehicle(vehicle);
    //   const alert = await this.alert.create(
    //     {
    //       header: 'Info',
    //       message: 'Your offer has been successfully deleted.',
    //       buttons: [{
    //         text: 'OK',
    //         handler: (click) => {
    //           this.router.navigate(['/vehicles']);
    //           //this.nav.navigateRoot('/vehicles');
    //           //this.router.navigate(['/vehicles-reload']);
    //         } }]
    //     }
    //   );
    //   await alert.present();
    // }
  }
  async finallyDeleteOffer(vehicle){
    this.backend.deleteVehicle(vehicle);
    this.router.navigate(['/vehicles']);
    const alert = await this.alert.create(
          {
            header: 'Info',
            message: 'Your offer has been successfully deleted.',
            buttons: [{
              text: 'OK',
              handler: (click) => {
                this.router.navigate(['/vehicles']);
                //this.nav.navigateRoot('/vehicles');
                //this.router.navigate(['/vehicles-reload']);
              } }]
          }
        );
        await alert.present();
  }
}
