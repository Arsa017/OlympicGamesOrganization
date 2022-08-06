import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VodjaService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  unesiSportistu(ime, prezime, pol, imeSporta, imeDiscipline, nacionalnost, osvajacMedalje) {
   /* let diciplinaObj = {
      nazivDiscipline: imeDiscipline,
    }*/
    const data = {
      ime: ime,
      prezime: prezime,
      pol: pol,
      nazivSporta: imeSporta,
      disciplina: imeDiscipline,
      nacionalnost: nacionalnost,
      osvajacMedalje: osvajacMedalje,
    }

    return this.http.post(`${this.uri}/sportisti/unesiSportistu`, data);
  }

  dohvatiSportove() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSportove`);
  }

  dohvatiIndividualneSportove() {
    return this.http.get(`${this.uri}/sportovi/dohvatiIndividualneSportove`);
  }

  dohvatiSport(nazivSporta, nazivDiscipline) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline
    }

    return this.http.post(`${this.uri}/sportovi/dohvatiSport`, data);
  }

  dohvatiSportistuZaSportIDisciplinu(nazivSporta, nazivDiscipline, pol, nacionalnost) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol,
      nacionalnost: nacionalnost
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiSportistuZaSportIDisciplinu`, data);
  }

  dohvatiSportistuPoImenuIPrezimenu(ime, prezime, pol, nacionalnost) {
    const data = {
      ime: ime,
      prezime: prezime,
      pol: pol,
      nacionalnost: nacionalnost
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiSportistuPoImenuIPrezimenu`, data);
  }

}
