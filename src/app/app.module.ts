import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    CallToActionComponent
  ],
  imports: [NgbModule, TooltipModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
