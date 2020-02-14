import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { BackendService } from 'src/app/service/backend.service';
import { Vehicle } from 'src/app/model/vehicle.model';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.page.html',
  styleUrls: ['./vehicle-create.page.scss'],
})
export class VehicleCreatePage implements OnInit {

  chosenImg: any;
  user: User;
 // @Output() imgChoose = new EventEmitter<string>();
  constructor(private backend: BackendService) { }

  ngOnInit() {
  }
  onSubmitForm(forma){
    var model = forma.value.model;
    var manufacturer = forma.value.manufacturer;
    var year = forma.value.year;
    var desc = forma.value.desc;
    var date = forma.value.date;
    var price = forma.value.price;
    var vehicle = new Vehicle('', model, manufacturer, desc,
    "https://autorepublika.com/wp-content/uploads/2018/11/2019-honda-civic-type-r-1.jpg",
     year, price, date, this.user, []);
    
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

}
