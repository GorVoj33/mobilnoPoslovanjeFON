import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { BackendService } from './service/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  darkTheme: boolean = false;
  userLoaded: boolean = false;
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private backend: BackendService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  changeTheme() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      document.body.classList.toggle('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  goToVehicles() {
    this.router.navigate(['/vehicles']);
  }
  goToLikedVehicles() {
    this.router.navigate(['/vehicles']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }
  logout(){
    this.user = this.backend.getLoggedUser();
    if(this.user.email !== null) {
      this.userLoaded = true;
    }
    console.log('Ulogovan: ');
    console.log(this.user);
  }
}
