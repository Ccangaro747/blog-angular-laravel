import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; //Importar el módulo HTTPClientModule para poder hacer peticiones AJAX a un servidor remoto en Angular

import { routing, appRoutingProviders  } from './app.routing'; //Import the routing configuration

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing, //Add the routing configuration
    FormsModule,
    HttpClientModule //Add the HttpClientModule module
  ],
  providers: [
    appRoutingProviders //Add the routing providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
