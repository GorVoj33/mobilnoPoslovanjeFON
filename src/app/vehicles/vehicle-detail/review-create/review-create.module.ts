import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewCreatePageRoutingModule } from './review-create-routing.module';

import { ReviewCreatePage } from './review-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewCreatePageRoutingModule
  ],
  declarations: [ReviewCreatePage]
})
export class ReviewCreatePageModule {}
