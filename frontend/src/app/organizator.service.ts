import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizatorService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  dohvatiNeregistrovaneKorisnike() {
    return this.http.get(`${this.uri}/korisnici/dohvatiNeregistrovaneKorisnike`);
  }

  odobriRegistraciju(username) {
    const data = {
      kor_ime: username
    }

    return this.http.post(`${this.uri}/korisnici/odobriRegistraciju`, data);
  } 

  dodajSport(nazivSporta, nazivDiscipline, vrstaSporta, registrovanM, registrovanZ) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      vrstaSporta: vrstaSporta,
      registrovanM: registrovanM,
      registrovanZ: registrovanZ
    }
    
    return this.http.post(`${this.uri}/sportovi/dodajSport`, data);
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

  kreirajTakmicenje(nazivSporta, nazivDiscipline, format, pol, datumPocetka, datumKraja, tacanDatum,
    satnica, lokacija, boljiRezultat, /*takmicenjeKreirano,*/ sportistiDodati) {

      const data =  {
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline,
        format: format,
        pol: pol,
        datumPocetka: datumPocetka,
        datumKraja: datumKraja,
        tacanDatum: tacanDatum,
        satnica: satnica,
        lokacija: lokacija,
      //  sportisti: sportisti,
      //  delegati: delegati,
        boljiRezultat: boljiRezultat,
      //  takmicenjeKreirano: takmicenjeKreirano,
        sportistiDodati: sportistiDodati
      }

      return this.http.post(`${this.uri}/takmicenja/kreirajTakmicenje`, data);
    }

    dohvatiTakmicenjeZaDisciplinuIPol(nazivSporta, nazivDiscipline, pol) {
      const data = {
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline,
        pol: pol
      }

      return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjeZaDisciplinuIPol`, data);
    }

    dohvatiTakmicenja() {
      return this.http.get(`${this.uri}/takmicenja/dohvatiTakmicenja`);
    }

    dohvatiTakmicenjaBezSportista() {
      return this.http.get(`${this.uri}/takmicenja/dohvatiTakmicenjaBezSportista`);
    }

    dohvatiSportisteIstogPolaZaSportIDisciplinu(nazivSporta, nazivDiscipline, pol) {
      const data = {
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline,
        pol: pol
      }
      return this.http.post(`${this.uri}/sportisti/dohvatiSportisteIstogPolaZaSportIDisciplinu`, data);
    }

    dodajSportistuUTakmicenje(nazivSporta, nazivDiscipline, pol, imeSportiste, prezimeSportise, nacionalnost) {
      const data = {
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline,
        pol: pol,
        ime: imeSportiste,
        prezime: prezimeSportise,
        nacionalnost: nacionalnost
      }
      return this.http.post(`${this.uri}/takmicenja/dodajSportistuUTakmicenje`, data);
    }

    azurirajFlegSportistiDodati(nazivSporta, nazivDiscipline, pol) {
      const data = {
        nazivSporta: nazivSporta, 
        nazivDiscipline: nazivDiscipline, 
        pol: pol
      }
      return this.http.post(`${this.uri}/takmicenja/azurirajFlegSportistiDodati`, data);
    }

    registrujMuskiSport(nazivSporta, nazivDiscipline) {
      const data ={
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline
      }
      return this.http.post(`${this.uri}/sportovi/registrujMuskiSport`, data);
    }

    registrujZenskiSport(nazivSporta, nazivDiscipline) {
      const data ={
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline
      }
      return this.http.post(`${this.uri}/sportovi/registrujZenskiSport`, data);
    }

    dohvatiRegistrovaneDelegate() {
      return this.http.get(`${this.uri}/korisnici/dohvatiRegistrovaneDelegate`);
    }

    dodajDelegata(nazivSporta, nazivDiscipline, pol, kor_ime) {
      const data = {
        nazivSporta: nazivSporta,
        nazivDiscipline: nazivDiscipline,
        pol:pol,
        kor_ime: kor_ime
      }
      return this.http.post(`${this.uri}/takmicenja/dodajDelegata`, data);
    }

    dohvatiDelegataZaTakmicenje(nazivSporta, nazivDiscipline, pol, kor_ime) {
      const data = {
        nazivSporta: nazivSporta, 
        nazivDiscipline: nazivDiscipline, 
        pol: pol,
        kor_ime: kor_ime
      }
      return this.http.post(`${this.uri}/takmicenja/dohvatiDelegataZaTakmicenje`, data);
    }

    dohvatiTakmicenjaDelegata(kor_ime) {
      const data = {
        kor_ime: kor_ime
      }
      return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjaDelegata`, data);
    }

}
