import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { VodjaService } from '../vodja.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-vodja-delegacije',
  templateUrl: './vodja-delegacije.component.html',
  styleUrls: ['./vodja-delegacije.component.css']
})
export class VodjaDelegacijeComponent implements OnInit {

  constructor(private ruter: Router, private vodjaServis: VodjaService,
    private zemljaServis: ZemljaService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
     if( this.korisnik === null) {
      //alert("ulazi");
      this.ruter.navigate(['/prijava']);
    } else {
      if(this.korisnik.tip != "vodja") {
        this.ruter.navigate(['/prijava']);
      }
    }

    this.vodja = JSON.parse(localStorage.getItem('ulogovan'));
    this.vodjaServis.dohvatiIndividualneSportove().subscribe((podaci: Sport[]) => {
      this.sportovi = podaci;
    })
  }

  vodja: Korisnik;
  sportovi: Sport[];

  korisnik: Korisnik = new Korisnik();

  ime: string = "";
  prezime: string = "";
  pol: string = "";
  sportIdisciplina: string = "";
  imeSporta: string = "";
  imeDiscipline: string = "";
  nacionalnost: string = "";
  osvajacMedalje: string = "false";

  odabraniSport: Sport;

  unesiSportistu() {

    if (this.ime == "" || this.prezime == "" || this.sportIdisciplina == "" || this.pol == "") {
      alert("Unesite sve podatke!");
      return;
    }

    this.nacionalnost = this.vodja.nacionalnost;
    this.imeSporta = this.sportIdisciplina.split('-')[0];
    this.imeDiscipline = this.sportIdisciplina.split('-')[1];


    this.vodjaServis.dohvatiSport(this.imeSporta, this.imeDiscipline).subscribe((sport: Sport) => {

      if ((sport.registrovanM == true && this.pol == "muski")||(sport.registrovanZ == true && this.pol == "zenski")) {

        alert("Prijava neuspesna! Takmicenje za izabranu sportsku disciplinu formirano.");
      } else {
      //  alert("Prolazi proveru formiran");
        this.vodjaServis.dohvatiSportistuZaSportIDisciplinu(this.imeSporta, this.imeDiscipline, this.pol, this.nacionalnost).subscribe(resp => {
          if (resp["message"] == "OK") {
            alert("Sportska disciplina zauzeta za posmatranu zemlju!");
          } else {
          //  alert("Prolazi proveru DVA u istoj disciplini za zemlju");
            this.vodjaServis.dohvatiSportistuPoImenuIPrezimenu(this.ime, this.prezime, this.pol,
              this.nacionalnost).subscribe((sportista: Sportista) => {
                if (sportista) {  // da li sportista postoji u bazi ?
             //     alert("Sportista postojao u bazu");
                  if (sportista.nazivSporta != this.imeSporta) {  // i ako postoji da li zelimo da ga prijavimo za disciplinu istog sporta
                    alert("Prijava neuspesna! Sportistu mozete prijaviti za discipline sporta: " + sportista.nazivSporta);
                  } else {
                //    alert("Prolazi proveru takmicar u istom sportu");
                    this.vodjaServis.unesiSportistu(this.ime, this.prezime, this.pol, this.imeSporta, this.imeDiscipline,
                      this.nacionalnost, this.osvajacMedalje).subscribe(resp => {
                        if (resp["message"] == "ok") {
                          alert("Sportista uspesno prijavljen!");
                        } else {
                          alert("Greska pri dodavanju sportiste!");
                        }
                      })
                  }
                } else {
              //    alert("sportista nije postojao u bazu")
                  this.vodjaServis.unesiSportistu(this.ime, this.prezime, this.pol, this.imeSporta, this.imeDiscipline,
                    this.nacionalnost, this.osvajacMedalje).subscribe(resp => {
                      if (resp["message"] == "ok") {
                        // nakon sto uspesno prijavimo sportistu trebalo bi da uvecamo ukBrSportista za tu zemlju
                      //  alert("Idemo da uvecamo broj sportista!");
                        this.zemljaServis.uvecajBrojSportista(this.nacionalnost).subscribe(resp =>{
                          if(resp["message"] != "ok") {
                            alert("Greska pri uvecavanju broja sportista!");
                          }
                        })
                        alert("Sportista uspesno prijavljen!");
                      } else {
                        alert("Greska pri dodavanju sportiste!");
                      }
                    })
                }

              })
          }
        })
      }
    })


    
  }


  izlogujSe() {
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }
}
