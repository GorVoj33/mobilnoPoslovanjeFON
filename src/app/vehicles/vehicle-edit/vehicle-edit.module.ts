import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleEditPageRoutingModule } from './vehicle-edit-routing.module';

import { VehicleEditPage } from './vehicle-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleEditPageRoutingModule
  ],
  declarations: [VehicleEditPage]
})
export class VehicleEditPageModule {}
