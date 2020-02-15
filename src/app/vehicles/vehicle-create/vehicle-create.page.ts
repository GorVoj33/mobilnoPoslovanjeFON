import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { BackendService } from 'src/app/service/backend.service';
import { Vehicle } from 'src/app/model/vehicle.model';
import { Plugins, CameraResultType, Capacitor, CameraSource, CameraPhoto } from '@capacitor/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
const { Camera } = Plugins;

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.page.html',
  styleUrls: ['./vehicle-create.page.scss'],
})
export class VehicleCreatePage implements OnInit {

  chosenImg: any;
  createdPhoto: CameraPhoto = null;
  user: User;
 // @Output() imgChoose = new EventEmitter<string>();
  constructor(
    private backend: BackendService,
    private alert: AlertController,
    private router: Router,
    private nav: NavController) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
    }

  ngOnInit() {
    
    this.user = this.backend.getLoggedUser();
  }
  async onSubmitForm(forma){
    var model = forma.value.model;
    var manufacturer = forma.value.manufacturer;
    var year = forma.value.year;
    var desc = forma.value.desc;
    var date = forma.value.date;
    var price = forma.value.price;
    var vehicle;
    if(this.createdPhoto != null) {
      vehicle = new Vehicle('fakeId', model, manufacturer, desc,
      this.createdPhoto.webPath,
       year, price, date, this.user, [], this.createdPhoto);
    }else {
      vehicle = new Vehicle('fakeId', model, manufacturer, desc,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSE2AP1RYsEAWH9Wpp_0DX-7BVREAK2XfQi57sh5kcypUaQH8_X",
      year, price, date, this.user, []);
    }
    this.backend.addNewVehicle(vehicle);
    const alert = await this.alert.create(
      {
        header: 'Info',
        message: 'Your offer has been successfully submited. Thank you.',
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
        //var veh = new Vehicle('vehId', mode)
      });
    
  }

  goToMain(){
    this.router.navigate(['/vehicles']);
    //this.nav.navigateRoot('/vehicles');
  }
}
