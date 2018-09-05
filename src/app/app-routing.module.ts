import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HamplifyComponent } from './hamplify/hamplify.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/hamplify', pathMatch: 'full' },
  { path: 'hamplify', component: HamplifyComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
