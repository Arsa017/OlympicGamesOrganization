import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  dodajZemlju(nazivZemlje, zlatneMedalje, srebrneMedalje,
    bronzaneMedalje, ukupnoMedalje, brSportista) {
    const data = {
      naziv: nazivZemlje,
      brZlatnihMedalja: zlatneMedalje,
      brSrebrnihMedalja: srebrneMedalje,
      brBronzanihMedalja: bronzaneMedalje,
      ukBrMedalja: ukupnoMedalje,
      ukBrSportista: brSportista
    }

    return this.http.post(`${this.uri}/zemlje/dodajZemlju`, data);
  }

  uvecajBrojSportista(nazivZemlje) {
    const data = {
      naziv: nazivZemlje
    }
    return this.http.post(`${this.uri}/zemlje/uvecajBrojSportista`, data);
  }

  dohvatiZemlje(zemljePoStrani: number, currentPage: number) {
   // const queryParams = `?pagesize=${zemljePoStrani}&page=${currentPage}`;
    const data = {
      pagesize: zemljePoStrani,
      page: currentPage
    }
    
    return this.http.post(`${this.uri}/zemlje/dohvatiZemlje`, data);
  //  return this.http.get("http://localhost:4000/zemlje/dohvatiZemlje" + queryParams);
  }

  dohvatiSveZemlje() {
    return this.http.get(`${this.uri}/zemlje/dohvatiSveZemlje`);
  }

  dohvatiZemljeSortiranePoMedaljama() {
    return this.http.get(`${this.uri}/zemlje/dohvatiZemljeSortiranePoMedaljama`);
  }

}
