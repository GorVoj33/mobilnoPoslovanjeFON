import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { BackendService } from '../service/backend.service';
import { format } from 'url';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{
  

  public isLoginMode = true;
  isLoading:boolean = false;
  error: boolean = true;
  message: string = '';
  //form: NgForm;
  constructor(
    private backend: BackendService,
    private router: Router,
    private navCtrl: NavController,
    private alert: AlertController
  ) { }

  async onSubmit(form: NgForm){
    //this.form = form;
    var email = form.value.email;
    var password = form.value.pass;
    this.isLoading = true;
    var myMessage = '';
    if ( this.isLoginMode ) {
      var success = this.backend.login(email, password);
      console.log(email, password);
      if (success) {
        this.isLoading = false;
        myMessage = 'You have been successfully logged in.';
      }
      else {
        this.isLoading = false;
        myMessage = 'You have entered invalid credentials, please, try again.';
      }
      const alert = await this.alert.create(
          {
            header: 'Info',
            message: myMessage,
            buttons: ['OK']
          }
      );
      form.reset();
      await alert.present();
      if(success) {
        this.router.navigate(['/vehicles']);
      }
    }
    else {
      let firstName = form.value.firstname;
      let lastName = form.value.lastname;
      let contact = form.value.contact;
      var success = this.backend.register(email, false, password, firstName, lastName, contact);
      if (success) {
        this.isLoading = false;
        myMessage = 'You have been successfully registered. Please login!';
      }
      else {
        this.isLoading = false;
        myMessage = 'Registration failed, this email is taken, try with another one.';
        //alert('Invalid credentials.');
      }
      const alert = await this.alert.create(
          {
            header: 'Info',
            message: myMessage,
            buttons: ['OK']
          }
      );
      await alert.present();
      form.reset();
      this.switchMode(); 
    }
    
    
    //console.log("Kredencijali: "+username+ "  "+password);
  }
  ngOnDestroy(): void {
    //this.form.reset();
  }
  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  

}
