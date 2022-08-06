import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { GostComponent } from './gost/gost.component';

import { VodjaDelegacijeComponent } from './vodja-delegacije/vodja-delegacije.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { ListaSportovaComponent } from './lista-sportova/lista-sportova.component';
import { MatSelectModule } from '@angular/material/select';
import { PregledZemaljaComponent } from './pregled-zemalja/pregled-zemalja.component';
import { PregledMedaljaComponent } from './pregled-medalja/pregled-medalja.component';
import { PretragaSportistaComponent } from './pretraga-sportista/pretraga-sportista.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DelegatComponent } from './delegat/delegat.component';
import { FinalnaGrupaComponent } from './finalna-grupa/finalna-grupa.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    OrganizatorComponent,
    GostComponent,

    VodjaDelegacijeComponent,
    HeaderComponent,
    ListaSportovaComponent,
    PregledZemaljaComponent,
    PregledMedaljaComponent,
    PretragaSportistaComponent,
    DelegatComponent,
    FinalnaGrupaComponent,
    UnosRezultataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
