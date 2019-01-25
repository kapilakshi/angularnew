import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HighlightPipe } from './highlight.pipe';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataViewModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: environment.path}],
  bootstrap: [AppComponent]
})
export class AppModule { }
