import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetproductComponent } from './getproduct/getproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CartComponent } from './cart/cart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRoute: Routes =[
  {
    path:'',redirectTo:'home',pathMatch:'full'
  }
  ,{
    path:'home',component:HomeComponent
  },
  {
    path:"GET",component:GetproductComponent
  },{
    path:'ADD',component:AddproductComponent
  },
  {
    path:'cart',component:CartComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GetproductComponent,
    AddproductComponent,
    HomeComponent,
    SearchComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [provideRouter(appRoute, withComponentInputBinding()), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
