import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelegatService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  dohvatiTakmicenjaDelegata(username) {
    const data = {
      kor_ime: username
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjaDelegata`, data);
  }

  dohvatiTakmicenjaDelegataBezDatumaFinala(username) {
    const data = {
      kor_ime: username
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjaDelegataBezDatumaFinala`, data);
  }

  dohvatiTakmicenjeZaDisciplinuIPol(nazivSporta, nazivDiscipline, pol) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjeZaDisciplinuIPol`, data);
  }

  dohvatiTakmicenjeZaLokacijuDatumISatnicu(datum, satnica, lokacija) {
    const data = {
      tacanDatum: datum,
      satnica: satnica,
      lokacija: lokacija
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjeZaLokacijuDatumISatnicu`, data);
  }

  azurirajTacanDatumISatnicuTakmicenja(nazivSporta, nazivDiscipline, pol, tacanDatum, satnica) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol,
      tacanDatum: tacanDatum,
      satnica: satnica
    }

    return this.http.post(`${this.uri}/takmicenja/azurirajTacanDatumISatnicuTakmicenja`, data);
  }

  kreirajGrupu(nazivSporta, nazivDiscipline, pol, format, boljiRezultat, grupaKreirana, medaljeDodeljene) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol,
      format: format,
      boljiRezultat: boljiRezultat,
      grupaKreirana: grupaKreirana,
      medaljeDodeljene: medaljeDodeljene
    }

    return this.http.post(`${this.uri}/grupe/kreirajGrupu`, data);
  }

  dodajFinalistu(nazivSporta, nazivDiscipline, pol, ime, prezime, nacionalnost) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol,
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost
    }

    return this.http.post(`${this.uri}/grupe/dodajFinalistu`, data);
  }

  dohvatiGrupu(nazivSporta, nazivDiscipline, pol) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol
    }

    return this.http.post(`${this.uri}/grupe/dohvatiGrupu`, data);
  }

  dohvatiFinalneGrupeBezUnesenihRezultata() {
    return this.http.get(`${this.uri}/grupe/dohvatiFinalneGrupeBezUnesenihRezultata`);
  }

  uvecajBrojZlatnihMedalja(drzava) {
    const data = {
      naziv: drzava
    }

    return this.http.post(`${this.uri}/zemlje/uvecajBrojZlatnihMedalja`, data);
  }

  uvecajBrojSrebrnihMedalja(drzava) {
    const data = {
      naziv: drzava
    }

    return this.http.post(`${this.uri}/zemlje/uvecajBrojSrebrnihMedalja`, data);
  }

  uvecajBrojBronzanihMedalja(drzava) {
    const data = {
      naziv: drzava
    }

    return this.http.post(`${this.uri}/zemlje/uvecajBrojBronzanihMedalja`, data);
  }

  uvecajUkupanBrojMedalja(drzava) {
    const data = {
      naziv: drzava
    }

    return this.http.post(`${this.uri}/zemlje/uvecajUkupanBrojMedalja`, data);
  }

  dodeliMedaljuSportisti(ime, prezime, nacionalnost) {
    const data = {
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost
    }

    return this.http.post(`${this.uri}/sportisti/dodeliMedaljuSportisti`, data);
  }

  azurirajFlegMedaljeDodeljene(nazivSporta, nazivDiscipline, pol) {
    const data = {
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline,
      pol: pol
    }

    return this.http.post(`${this.uri}/grupe/azurirajFlegMedaljeDodeljene`, data);
  }

}

