import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GostService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  dohvatiRazliciteNaziveSportova() {
    return this.http.get(`${this.uri}/sportovi/dohvatiRazliciteNaziveSportova`);
  }

  dohvatiRazliciteDiscipline() {
    return this.http.get(`${this.uri}/sportovi/dohvatiRazliciteDiscipline`);
  }

  dohvatiSveSportiste() {
    return this.http.get(`${this.uri}/sportisti/dohvatiSveSportiste`);
  }

  pretraziSportiste(ime, prezime, drzava, sport, disciplina, pol, osvajacMedalje) {
    const data = {
      ime: ime,
      prezime: prezime,
      nacionalnost: drzava,
      nazivSporta: sport,
      nazivDiscipline: disciplina,
      pol: pol,
      osvajacMedalje: osvajacMedalje
    }
    /*alert(ime);
    alert(prezime); alert(drzava); alert(sport); 
    alert(disciplina);
    alert(pol);*/
    return this.http.post(`${this.uri}/sportisti/pretraziSportiste`, data);
  }
  
}



