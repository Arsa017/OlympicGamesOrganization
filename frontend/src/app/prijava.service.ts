import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrijavaService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  prijava(kor_ime, lozinka) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/prijava`, data);
  }

  registracija(kor_ime, lozinka, ime, prezime, nacionalnost, email, tip, registrovan) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost,
      email: email,
      tip: tip,
      registrovan: registrovan
    }

    return this.http.post(`${this.uri}/korisnici/registracija`, data);
  }

  dohvatiOrganizatora() {
    return this.http.get(`${this.uri}/korisnici/dohvatiOrganizatora`);
  }

  dohvatiVodjuNacije(zemlja) {
    const data = {
      nacionalnost: zemlja
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiVodjuNacije`, data);
  }

  dohvatiKorisnika(username) {
    const data = {
      kor_ime: username
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, data)
  }

  dohvatiKorisnikaUP(username, password) {
    const data = {
      kor_ime: username,
      lozinka: password
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnikaUP`, data);
  }

  promeniLozinkuKorisniku(username, staraLozinka, novaLozinka) {
    const data = {
      kor_ime: username,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }

    return this.http.post(`${this.uri}/korisnici/promeniLozinkuKorisniku`, data);
  }

}
