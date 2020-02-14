import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleDetailPage } from './vehicle-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleDetailPage
  },
  {
    path: 'review-create',
    loadChildren: () => import('./review-create/review-create.module').then( m => m.ReviewCreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDetailPageRoutingModule {}
