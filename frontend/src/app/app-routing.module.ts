import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { FinalnaGrupaComponent } from './finalna-grupa/finalna-grupa.component';
import { GostComponent } from './gost/gost.component';
import { Guard } from './guard/guard';
import { ListaSportovaComponent } from './lista-sportova/lista-sportova.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledMedaljaComponent } from './pregled-medalja/pregled-medalja.component';
import { PregledZemaljaComponent } from './pregled-zemalja/pregled-zemalja.component';
import { PretragaSportistaComponent } from './pretraga-sportista/pretraga-sportista.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';
import { VodjaDelegacijeComponent } from './vodja-delegacije/vodja-delegacije.component';

const routes: Routes = [
  {path:"", component: PocetnaComponent},
  {path:"gost", component: GostComponent},
  {path:"prijava", component: PrijavaComponent},
  {path:"organizator", component: OrganizatorComponent/*, canActivate: [Guard]*/},
  {path:"delegat", component: DelegatComponent/*, canActivate: [Guard]*/},
  {path:"vodja-delegacije", component: VodjaDelegacijeComponent/*, canActivate: [Guard]*/},
  {path:"lista-sportova", component: ListaSportovaComponent},
  {path:"pregled-medalja", component: PregledMedaljaComponent},
  {path:"pregled-zemalja", component: PregledZemaljaComponent},
  {path:"pretraga-sportista", component: PretragaSportistaComponent},
  {path:"finalna-grupa", component: FinalnaGrupaComponent},
  {path:"unos-rezultata", component: UnosRezultataComponent},
  {path:"**", component: PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Guard]
})
export class AppRoutingModule { }
