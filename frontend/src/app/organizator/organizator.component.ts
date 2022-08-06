import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { OrganizatorService } from '../organizator.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  minDate: Date;

  constructor(private ruter: Router, private organizatorService: OrganizatorService) { }

  ngOnInit(): void {
     this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
     if( this.korisnik === null) {
      //alert("ulazi");
      this.ruter.navigate(['/prijava']);
    } else {
      if(this.korisnik.tip != "organizator") {
        this.ruter.navigate(['/prijava']);
      }
    }



   // alert("tera dalje");

    this.minDate = new Date();
    this.organizatorService.dohvatiNeregistrovaneKorisnike().subscribe((data: Korisnik[]) => {
      this.neregKorisnici = data;
      //console.log(this.neregKorisnici);
    })
    this.organizatorService.dohvatiSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
    })
    this.organizatorService.dohvatiIndividualneSportove().subscribe((data: Sport[]) => {
      this.individualniSportovi = data;
    })
    this.organizatorService.dohvatiTakmicenja().subscribe((data: Takmicenje[]) => {
      this.kreiranaTakmicenja = data;
    })
    this.organizatorService.dohvatiTakmicenjaBezSportista().subscribe((data: Takmicenje[]) => {
      this.takmicenjaBezSportista = data;
    })
    this.organizatorService.dohvatiRegistrovaneDelegate().subscribe((data: Korisnik[]) => {
      this.delegati = data;
    })
  }

  neregKorisnici: Korisnik[];
  
  korisnik: Korisnik = new Korisnik();

  odobriRegistraciju(username) {
    this.organizatorService.odobriRegistraciju(username).subscribe(response => {
      if (response['poruka'] == "ok") {
        //  alert("Ok");
        this.organizatorService.dohvatiNeregistrovaneKorisnike().subscribe((data: Korisnik[]) => {
          this.neregKorisnici = data;
        })
      }
    })
  }

  izlogujSe() {
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

  sportovi: Sport[];
  sport: Sport;
  nazivSporta: string = "";
  nazivDiscipline: string = "";
  vrsta: string = "";
  registrovanM: boolean = false;
  registrovanZ: boolean = false;

  dodajSport() {

    if (this.nazivSporta == "" || this.vrsta == "") {
      alert("Popunite sva polja!");
      return;
    }

    this.organizatorService.dohvatiSport(this.nazivSporta, this.nazivDiscipline).subscribe((sport: Sport) => {
      if (sport) {
        alert("Zadati sport i sportska disciplina vec postoje!");
      } else {
        this.organizatorService.dodajSport(this.nazivSporta, this.nazivDiscipline, this.vrsta, this.registrovanM, this.registrovanZ).subscribe(resp => {
          if (resp["message"] == "ok") {
            alert("Sport uspesno dodat");
          } else {
            alert("greska pri dodavanju sporta!")
          }
        })
      }
    })

  }

  // staticko definisanje formata takmicenja u kome pamtimo format rezultata i broj pokusaja 
  formati: string[] = [
    "ss:tt-pokusaj:1",  // 100m trcanje..
    "mm:ss:tt-pokusaj:1", // 800m trcanje..
    "m:cm-pokusaj:3", // skok u vis..
    "mm:cm-pokusaj:3",  // bacanje kugle..
    "hh:mm:ss-pokusaj:1", // maraton..
    "streljastvo-pokusaj:6", // 50m trostav
    "tenis-maxSetovi:3" // tenis u max 3 seta
  ];

  kreiranaTakmicenja: Takmicenje[];

  imeSporta: string = "";
  imeDiscipline: string = "";
  sportIdisciplina: string = "";
  formatTakmicenja: string = "";
  pol: string = "";
  datumPocetka: string = "";
  datumKraja: string = "";
  tacanDatum: string = "";
  satnica: string = "";
  lokacija: string = "";

  individualniSportovi: Sport[];

  boljiRezultat: number;
  takmicenjeKreirano: boolean = false;  // nakon sto kreiramo takmicenje u bazu, setujemo fleg za datu disciplinu da je takmicenje kreirano
  // kako ga ne bi smo 2 puta dodavali
  sortistiDodati: boolean = false;  // da ne bi 2 puta dodavali iste prijavljene sportiste u isto takmicenje
  //  sportovi: Sport[]; vec imamo informaciju -> treba samo da izlistamo i dohvatimo informacije koje nam su nam potrebne

  // dodavanje prijavljenih sportista -> niz: ImeSportiste, PrezimeSportiste, nacionalnost
  // odabir delegata za takmicenje

  kreirajTakmicenje() {
    if (this.sportIdisciplina == "" || this.formatTakmicenja == "" || this.pol == ""
      || this.datumPocetka == "" || this.datumKraja == "" || this.lokacija == "") {
      alert("Unesite sva polja!");
      return;
    }

    /* let test = new Date("2021-8-21");
     alert(test); return;*/

    let datumP = new Date(this.datumPocetka); // datum pocetka
    let datumK = new Date(this.datumKraja);   // datum kraja
    let dan = this.minDate.getDate();
    let mesec = this.minDate.getMonth();
    let godina = this.minDate.getFullYear();
    let sada = new Date(godina, mesec, dan);

    if ((datumK < datumP) || (datumP < sada) || (datumK < sada)) {
      alert("Proverite datum!");
      return;
    }
    // datum je ok
    this.imeSporta = this.sportIdisciplina.split('-')[0];
    this.imeDiscipline = this.sportIdisciplina.split('-')[1];

    // this.imeSporta = this.sportIdisciplina.split('-')[0];
    let tmpStr1 = this.formatTakmicenja.split('-')[1];
    let tmpStr2 = tmpStr1.split(':')[1];
    let brPokusaja = parseInt(tmpStr2);
    if (brPokusaja > 1) {
      this.boljiRezultat = 1;
    } else {
      this.boljiRezultat = -1;
    }

    this.organizatorService.dohvatiTakmicenjeZaDisciplinuIPol(this.imeSporta, this.imeDiscipline,
      this.pol).subscribe((takmicenje: Takmicenje) => {
        if (takmicenje) {
          alert("Takmicenje za izabranu sportsku disciplinu vec kreirano!");
        } else {
          this.organizatorService.kreirajTakmicenje(this.imeSporta, this.imeDiscipline, this.formatTakmicenja,
            this.pol, this.datumPocetka, this.datumKraja, this.tacanDatum, this.satnica, this.lokacija,
            this.boljiRezultat, /*true,*/ false).subscribe(resp => {
              if (resp['message'] == "ok") {
                alert("Takmicenje uspesno kreirano!");
                this.organizatorService.dohvatiTakmicenja().subscribe((data: Takmicenje[]) => {
                  this.kreiranaTakmicenja = data; // sva do sada kreirana takmicenja u sistemu
                })
                this.organizatorService.dohvatiTakmicenjaBezSportista().subscribe((data: Takmicenje[]) => {
                  this.takmicenjaBezSportista = data; // update niza svih takmicenja na kojima nisu jos uvek dodati sportisti
                })
              } else {
                alert("Greska pri dodavanju takmicenja!");
              }
            })
        }
      })

  }


  takmicenjaBezSportista: Takmicenje[];
  sportIdisciplinaZaFormiranje: string = "";
  sportisti: Sportista[];

  formirajTakmicenje() {

    if (this.sportIdisciplinaZaFormiranje == "") {
      alert("Odaberite takmicenje za formiranje!");
      return;
    }

    let imeSporta = this.sportIdisciplinaZaFormiranje.split('-')[0];
    let imeDiscipline = this.sportIdisciplinaZaFormiranje.split('-')[1];
    let pol = this.sportIdisciplinaZaFormiranje.split('-')[2];

    // azurirati sportsku disciplinu i registrovatiPol kako bi zabranili da vodje nacionalnih timova dodaju sportiste u tim takmicenjima
    if (pol == "muski") {
      this.organizatorService.registrujMuskiSport(imeSporta, imeDiscipline).subscribe(resp => {
        if (resp["message"] != "ok") {
          alert("Greska pri azuriranju flega registrovanM !");
        }
      })
    } else {
      // registrovati zensko takmicenje
      this.organizatorService.registrujZenskiSport(imeSporta, imeDiscipline).subscribe(resp => {
        if (resp["message"] != "ok") {
          alert("Greska pri azuriranju flega registrovanZ !");
        }
      })
    }


    this.organizatorService.dohvatiSportisteIstogPolaZaSportIDisciplinu(imeSporta,
      imeDiscipline, pol).subscribe((podaci: Sportista[]) => {
        if (podaci) {
          this.sportisti = podaci;
          this.sportisti.forEach(sportista => {
            this.organizatorService.dodajSportistuUTakmicenje(imeSporta, imeDiscipline, pol,
              sportista.ime, sportista.prezime, sportista.nacionalnost).subscribe(resp => {
                if (resp['message'] != "ok") {
                  alert("Greska pri dodavanju sportiste " + sportista.ime + " " + sportista.prezime + " " + sportista.nacionalnost);
                }
              })
          })
          // postaviti fleg sportistiDodati na true i azurirati niz spotista
          this.organizatorService.azurirajFlegSportistiDodati(imeSporta, imeDiscipline, pol).subscribe(response => {
            if (response["message"] != "ok") {
              alert("Greska pri azuriranju flega sportistiDodati!");
            } else {
              // azuriramo nizKreiranih takmicenja kojima sportisti nizu dodati
              this.organizatorService.dohvatiTakmicenjaBezSportista().subscribe((data: Takmicenje[]) => {
                this.takmicenjaBezSportista = data;
              })
              alert("Sportisti uspesno dodati!");
            }
          })
        } else {
          alert("Greska pri dohvatanju sportista");
        }
      })


  }


  sportIdisciplinaDelegat: string = "";
  delegati: Korisnik[];
  usernameDelegata: string = "";

  dodajDelegata() {
    if (this.sportIdisciplinaDelegat == "" || this.usernameDelegata == "") {
      alert("Unesite sva polja!");
      return;
    }

    let nazivSporta = this.sportIdisciplinaDelegat.split('-')[0];
    let nazivDiscipline = this.sportIdisciplinaDelegat.split('-')[1];
    let pol = this.sportIdisciplinaDelegat.split('-')[2];

    // provere za dodajDelegata():
    // 1) delegat sme da nadgleda najvise 3 takmicenja =
    // 2) ne smemo 2 puta da dodajemo istog delegata u takmicenje = odradjeno!

    this.organizatorService.dohvatiTakmicenjaDelegata(this.usernameDelegata).subscribe((takmicenja: Takmicenje[])=>{
      if(takmicenja.length >= 3) {
       // alert(takmicenja.length);
        alert("Neuspesno dodavanje! Delegat vec nadgleda 3 takmicenja!");
      } else {
        this.organizatorService.dohvatiDelegataZaTakmicenje(nazivSporta,
          nazivDiscipline, pol, this.usernameDelegata).subscribe((delegat: Korisnik) => {
            if (delegat) {
              alert("Neuspesno dodavanje! Delegat vec dodeljen takmicenju!");
            } else {
              this.organizatorService.dodajDelegata(nazivSporta, nazivDiscipline, pol,
                this.usernameDelegata).subscribe(resp => {
                  if (resp["message"] == "ok") {
                    alert("Delegat uspesno dodat!");
                  } else {
                    alert("Greska pri dodavanju delegata!");
                  }
                })
            }
          })
      }
    })


  }

}
