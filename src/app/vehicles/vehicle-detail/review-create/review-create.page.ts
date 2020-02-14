import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/service/backend.service';
import { AlertController } from '@ionic/angular';
import { Vehicle } from 'src/app/model/vehicle.model';
import { Review } from 'src/app/model/review.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.page.html',
  styleUrls: ['./review-create.page.scss'],
})
export class ReviewCreatePage implements OnInit {

  rate = 0;
  vehicle: Vehicle;
  newReview: Review;

  constructor(
    private route: ActivatedRoute,
    private backend: BackendService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      pm => {
        var id = pm.get('vehicleId');
        this.vehicle = this.backend.getAllVehicles().find(veh => veh.id === id);
      }
    );
  }
  async showRateChooser() {
    let alert = await this.alertCtrl.create({
      header: 'Rate this offer',
      inputs: [
        {
          type: 'radio',
          label: 'Very bad (1)',
          value: 1,
          checked: true
        },
        {
          type: 'radio',
          label: 'Bad (2)',
          value: 2
        },
        {
          type: 'radio',
          label: 'Ok (3)',
          value: 3
        },
        {
          type: 'radio',
          label: 'Very good (4)',
          value: 4
        },
        {
          type: 'radio',
          label: 'Excellent (5)',
          value: 5
        }
      ],
      buttons : [
        {
          text: 'Cancel'
        },
        {
          text: 'Rate',
          handler: (data: any) => {
            console.log('Radio data:', data);
            this.rate = data;
          }
        }
      ]
    });
    await alert.present();
  }
  async submitForm(forma){
    var comm = forma.value.comment;
    var value = forma.value.estvalue;
    this.newReview = new Review(comm, this.rate, value, new User('', '', false, ''), false,new Date());
    const alert = await this.alertCtrl.create(
      {
        header: 'Info',
        message: 'Your review is saved. It will be visible after administation checking.',
        buttons: ['OK']
      }
    );
    await alert.present();
    this.saveReview(this.newReview);
    
    
  }

  saveReview(newReview){
    this.vehicle.likes.push(newReview);
    //this.backend.updateVehicle(this.vehicle);
  }

}
