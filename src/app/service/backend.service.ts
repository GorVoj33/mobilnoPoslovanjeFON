import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Vehicle } from '../model/vehicle.model';
import { Review } from '../model/review.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
 
  
  public userAuthenticated = false;
  allUsers: User[] = [];
  allVehicles: Vehicle[] = [];
  loggedUser: User = null;
  constructor() { 
    this.allUsers.push(new User('1', 'user1@gmail.com', false, 'password1', 'Goran', 'Vojnovic', '0112121212'));
    this.allUsers.push(new User('2', 'user2@gmail.com', false, 'password1', 'Drugi', 'User', '0112121212'));
    this.allUsers.push(new User('3', 'user3@gmail.com', false, 'password1', 'Treci', 'User', '0112121212'));

    this.allVehicles.push(new Vehicle('1', 'Civic', 'Honda', 'A long, long description about Civic...',
     'https://www.cars-data.com/pictures/honda/honda-civic_896_19.jpg', 2015, 25000, new Date(), this.allUsers[0], []));
    this.allVehicles.push(new Vehicle('2', 'Corola', 'Toyota', 'A long, long description about Corola...',
    'https://mywishcard.com/s/i2/c5/c/470x0_y5cfkQAKuSu63Ny8R7raVSdisx4oyD8U___jpg____4_32c89547.jpg', 2016, 22000, new Date(), this.allUsers[0],[]));
    this.allVehicles.push(new Vehicle('3', '207', 'Peugeot', 'A long, long description about 207...',
    'https://i.ytimg.com/vi/wm_N5zHHwYM/maxresdefault.jpg', 2011, 5000, new Date(), this.allUsers[2], []));
    this.allVehicles.push(new Vehicle('4', '407', 'Peugeot', 'A long, long description about 407...',
    'https://www.autoportal.rs/images/main/peugeot-407.jpg', 2015, 8000, new Date(), this.allUsers[2], []));
    this.allVehicles.push(new Vehicle('5', 'Megane', 'Renault', 'A long, long description about Megane...',
    'https://www.renault.rs/CountriesData/Serbia/images/cars/NOVIMEGANE/BuditeDrugacijiOdDrugih/renault-megane-bfb-design-01_ig_w800_h450.jpg',
     2016, 16000, new Date(), this.allUsers[2], []));
  }
  public login(email, pass) {
    
    for (var u of this.allUsers) {
      //console.log(u);
      if(u.email === email) {
        if(u.password === pass) {
          this.loggedUser = u;
          this.userAuthenticated = true;
          return true;
        }
      }
    }
    return false;
  }

  register(email, isAdmin, password, firstName, lastName, contact) {
    for (var u of this.allUsers) {
      if(u.email === email) { return false; }
    }
    var newUser = new User((this.allUsers.length + 1) + '', email, isAdmin, password, firstName, lastName, contact);
    this.allUsers.push(newUser);
    this.loggedUser = newUser;
    
    console.log('List of users length: ', this.allUsers.length);
    return true;
  }
  getLoggedUser() {
    return this.loggedUser;
  }

  getAllVehicles() {
    return [...this.allVehicles];
  }

  saveReview(vehicle: Vehicle, newReview: Review){
    for (var veh of this.allVehicles){
      if(veh.id === vehicle.id){
        veh.reviews.push(newReview);
      }
    }
  }

  addNewVehicle(vehicle: Vehicle) {
    vehicle.id = (this.allVehicles.length + 1) + '';
    console.log('novi auto: ');
    console.log(vehicle);
    this.allVehicles.push(vehicle);
    console.log(this.allVehicles.length)
  }

  updateVehicle(vehicle: Vehicle) {
    // for (let v of this.allVehicles) {
    //   if(v.id === vehicle.id) {
    //     v = vehicle;
    //   }
    // }
    this.allVehicles.forEach((obj, index) => {
      if (obj.id === vehicle.id) {
        this.allVehicles[index] = vehicle;
      }
    });
  }

  logout() {
    if (this.userAuthenticated) {
      this.userAuthenticated = false;
      this.loggedUser = null;
      return true;
    }
    return false;
  }
  deleteVehicle(vehicle) {
    this.allVehicles.forEach((obj, index) => {
      if (obj.id === vehicle.id) {
        this.allVehicles.splice(index, 1);
      }
    });
  }

  populateLists(vehicles: Vehicle[], myVehicles: Vehicle[]) {
    for (let v of this.allVehicles) {
      if(v.owner.id === this.loggedUser.id) {
        myVehicles.push(v);
      }
      for(let review of v.reviews) {
        if(review.creator.id === this.loggedUser.id) {
          vehicles.push(v);
        }
      }
    }
  }
}
