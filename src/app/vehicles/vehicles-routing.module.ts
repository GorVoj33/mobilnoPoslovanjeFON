import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesPage } from './vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclesPage
  },
  {
    path: 'vehicle-create',
    loadChildren: () => import('./vehicle-create/vehicle-create.module').then( m => m.VehicleCreatePageModule)
  },
  {
    path: 'vehicle-edit/:vehicleID/edit',
    loadChildren: () => import('./vehicle-edit/vehicle-edit.module').then( m => m.VehicleEditPageModule)
  },
  {
    path: ':vehicleID',
    loadChildren: () => import('./vehicle-detail/vehicle-detail.module').then( m => m.VehicleDetailPageModule)
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesPageRoutingModule {}
