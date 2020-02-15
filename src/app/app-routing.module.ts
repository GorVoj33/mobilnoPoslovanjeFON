import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
  {
    path: 'vehicles-reload',
    loadChildren: () => import('./vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
  {
    path: 'my-reviews',
    loadChildren: () => import('./my-reviews/my-reviews.module').then( m => m.MyReviewsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
