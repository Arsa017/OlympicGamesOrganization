import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelegatService } from '../delegat.service';
import { Grupa } from '../models/grupa';
import { Korisnik } from '../models/korisnik';
import { Takmicenje } from '../models/takmicenje';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private ruter: Router, private delegatServis: DelegatService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if( this.korisnik === null) {
     //alert("ulazi");
     this.ruter.navigate(['/prijava']);
   } else {
     if(this.korisnik.tip != "delegat") {
       this.ruter.navigate(['/prijava']);
     }
   }

    this.delegat = JSON.parse(localStorage.getItem('ulogovan'));
    this.delegatServis.dohvatiTakmicenjaDelegataBezDatumaFinala(this.delegat.kor_ime).subscribe((podaci: Takmicenje[]) => {
      this.mojaTakmicenja = podaci;
    })

    this.delegatServis.dohvatiTakmicenjaDelegata(this.delegat.kor_ime).subscribe((data: Takmicenje[]) => {
      this.svaMojaTakmicenja = data;
      this.mojaFinalnaTakmicenja = data;
    })

    this.delegatServis.dohvatiFinalneGrupeBezUnesenihRezultata().subscribe((data: Grupa[]) => {
      this.finalneGrupe = data;
      //alert(this.finalneGrupe.length);
    })
  }

  korisnik: Korisnik = new Korisnik();

  delegat: Korisnik;
  mojaTakmicenja: Takmicenje[];
  sportIDiciplinaIPol: string = "";
  datum: string = "";
  satnica: string = "";

  nazivSporta: string = "";
  nazivDiscipline: string = "";
  pol: string = "";

  izlogujSe() {
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

  unesiTermin() {
    /* alert(this.mojaTakmicenja.length);
     return;*/

    if (this.sportIDiciplinaIPol == "" || this.datum == "" || this.satnica == "") {
      alert("Unesite sva polja!");
      return;
    }

    this.nazivSporta = this.sportIDiciplinaIPol.split('-')[0];
    this.nazivDiscipline = this.sportIDiciplinaIPol.split('-')[1];
    this.pol = this.sportIDiciplinaIPol.split('-')[2];
    let tacanDatum = new Date(this.datum); // kreiramo ga za proveru da li je datum iz odgovarajuceg opsega

    this.delegatServis.dohvatiTakmicenjeZaDisciplinuIPol(this.nazivSporta, this.nazivDiscipline,
      this.pol).subscribe((data: Takmicenje) => {
        if (data) {
          let pocetak = data.datumPocetka;  // datum pocetaka takmicenja
          let kraj = data.datumKraja; // datum kraja takmicenja
          let lokacija = data.lokacija; // lokacija takmicenja

          let datumPocetka = new Date(pocetak);
          let datumKraja = new Date(kraj);
          if (tacanDatum < datumPocetka || tacanDatum > datumKraja) {
            // provera za tacanDatum takmicenja; da li je iz opsega pocetka i kraja takmicenja
            alert("Greska! Datum je nevalidan!");
            return;
          } else {
            // trazimo da li na toj lokaciji tog datuma u toj satnici postoji neko drugo takmicenje
            this.delegatServis.dohvatiTakmicenjeZaLokacijuDatumISatnicu(this.datum,
              this.satnica, lokacija).subscribe((takmicenje: Takmicenje) => {
                if (takmicenje) {
                  alert("Lokacija takmicenja zauzeta za posmatrani datum i vreme!");
                  return;
                } else {
                  // sve provere ok pa azuriramo tacanDatum i satnicu naseg odabranog takmicenja i azuriramo niz takmicenja bez postavljene satnice
                  this.delegatServis.azurirajTacanDatumISatnicuTakmicenja(this.nazivSporta, this.nazivDiscipline,
                    this.pol, this.datum, this.satnica).subscribe(resp => {
                      if (resp["message"] == "ok") {
                        alert("Termin finalne grupe uspesno dodat!");
                        this.delegatServis.dohvatiTakmicenjaDelegataBezDatumaFinala(this.delegat.kor_ime).subscribe((podaci: Takmicenje[]) => {
                          this.mojaTakmicenja = podaci;
                        })
                      } else {
                        alert("Greska pri azuriranju termina za finalnu grupu!");
                        return;
                      }
                    })
                }
              })
          }
        }
      })
  }

  svaMojaTakmicenja: Takmicenje[];
  grupaSDP: string = "";

  kreirajGrupu() {
    if (this.grupaSDP == "") {
      alert("Odaberite takmicenje!"); return;
    }
    // alert(this.grupaSDP);
    let s = this.grupaSDP.split('-')[0];
    let d = this.grupaSDP.split('-')[1];
    let p = this.grupaSDP.split('-')[2];

    // provera da li je finalna grupa za odabrano takmicenje vec kreirana;

    this.delegatServis.dohvatiGrupu(s, d, p).subscribe((grupa: Grupa) => {
      if (grupa) {
        alert("Grupa za izabrani sport i sportsku disciplinu vec kreirana!");
      } else {
        // posledjujemo informaciju o takmicenju ruteru koji nas vodi na komponentu za kreiranje finalne grupe 

        localStorage.setItem('grupaSDP', JSON.stringify(this.grupaSDP));

        this.ruter.navigate(['/finalna-grupa']);
      }
    })

  }


  finalneGrupe: Grupa[];
  finaleSDP: string = "";
  finaleTakmicenja: Takmicenje;
  mojaFinalnaTakmicenja: Takmicenje[]; // niz svih mojih takmicenja

  unosRezultata() {
    if (this.finaleSDP == "") {
      alert("Odaberite finale!"); return;
    }

    let s = this.finaleSDP.split('-')[0];
    let d = this.finaleSDP.split('-')[1];
    let p = this.finaleSDP.split('-')[2];

    this.delegatServis.dohvatiTakmicenjeZaDisciplinuIPol(s, d, p).subscribe((data: Takmicenje) => {
      if (data) {
        this.finaleTakmicenja = data; // finale za koje zelimo da unesemo rezultat
        if (this.finaleTakmicenja.tacanDatum == "" || this.finaleTakmicenja.satnica == "") {
          alert("Unos rezultata moguc nakon odredjivanja termina finala!");
          return;
        } else {

          this.delegatServis.dohvatiGrupu(s, d, p).subscribe((data: Grupa) => {
            if (data) {
              // finalna grupa postoji pa prveravamo da li su medalje vec dodate pre navigacije na komponentu za unos rezultata

              if (data.medaljeDodeljene == false) {
                localStorage.setItem('finaleSDP', JSON.stringify(this.finaleSDP));

                this.ruter.navigate(['/unos-rezultata']);
              } else {
                alert("Takmicenje za odabrani sport i sportsku disciplinu zavrseno!");
                return;
              }


            } else {
              alert("Unos rezultata moguc nakon kreiranja finalne grupe!");
            }
          })

        }

      } else {
        alert("Greska pri dohvatanju takmicenja!");
        return;
      }
    })

  }


}

