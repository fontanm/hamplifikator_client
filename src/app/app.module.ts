import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HamplifyComponent } from './hamplify/hamplify.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HamplifyComponent,
    AboutComponent,
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
