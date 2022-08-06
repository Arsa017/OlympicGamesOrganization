import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelegatService } from '../delegat.service';
import { Grupa } from '../models/grupa';
import { Korisnik } from '../models/korisnik';
import { Takmicenje } from '../models/takmicenje';

@Component({
  selector: 'app-finalna-grupa',
  templateUrl: './finalna-grupa.component.html',
  styleUrls: ['./finalna-grupa.component.css']
})
export class FinalnaGrupaComponent implements OnInit {

  constructor(private ruter: Router, private delegatServis: DelegatService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if( this.korisnik === null ) {
     //alert("ulazi");
     this.ruter.navigate(['/prijava']);
   } else {
     if(this.korisnik.tip != "delegat") {
       this.ruter.navigate(['/prijava']);
     }
   }

    this.grupaSDP = JSON.parse(localStorage.getItem('grupaSDP'));
    if(this.grupaSDP === null) {
      this.ruter.navigate(['/prijava']);
    } else {
      this.nazivSporta = this.grupaSDP.split('-')[0];
    this.nazivDiscipline = this.grupaSDP.split('-')[1];
    this.pol = this.grupaSDP.split('-')[2];
    
    this.delegatServis.dohvatiTakmicenjeZaDisciplinuIPol(this.nazivSporta, 
      this.nazivDiscipline, this.pol).subscribe((data: Takmicenje)=>{
        this.takmicenje = data;
      })
    }

    /*
    this.nazivSporta = this.grupaSDP.split('-')[0];
    this.nazivDiscipline = this.grupaSDP.split('-')[1];
    this.pol = this.grupaSDP.split('-')[2];
    
    this.delegatServis.dohvatiTakmicenjeZaDisciplinuIPol(this.nazivSporta, 
      this.nazivDiscipline, this.pol).subscribe((data: Takmicenje)=>{
        this.takmicenje = data;
      })
*/
  }

  korisnik: Korisnik = new Korisnik();

  nazivSporta: string = "";
  nazivDiscipline: string = "";
  pol: string = "";
  grupaSDP: string = "";

  takmicenje: Takmicenje;
  cnt: number = 0;
  grupaKreirana: boolean = true;
  medaljeDodeljene: boolean = false;

  formirajGrupu() {
    this.takmicenje.sportisti.forEach(sportista => {
      if(sportista.finalista == true) {
     //   alert(sportista.ime); alert(sportista.prezime); alert(sportista.nacionalnost);
        this.cnt++;
      }
    })
    
    if(this.cnt == 0) {
      alert("Izaberite finaliste!"); 
      return;
    }

    if(this.cnt > 8) {
      alert("Finalna grupa moze imati maksimalno 8 sportista!");
      this.cnt = 0;
      return;
    } else {
      this.cnt = 0;
    }

  //  alert("ok");
    // kreiranje grupne faze; ako je uspesno kreirana PUSHUJEMO jednog po jednog finalistu u niz finalista
    // kada dodamo sportiste setujemo fleg GRUPA KREIRANA = true; DodeljeneMedalje = false 

    this.delegatServis.kreirajGrupu(this.takmicenje.nazivSporta, this.takmicenje.nazivDiscipline, this.takmicenje.pol,
        this.takmicenje.format, this.takmicenje.boljiRezultat, 
        this.grupaKreirana, this.medaljeDodeljene).subscribe((data: Grupa)=>{
          if(data) {
            alert("Grupa uspesno kreirana!");
            this.takmicenje.sportisti.forEach(sportista=>{
              if(sportista.finalista == true) {
                // dodavanje sportiste u niz finalista za kreiranu grupu 
                this.delegatServis.dodajFinalistu(this.takmicenje.nazivSporta, this.takmicenje.nazivDiscipline,
                  this.takmicenje.pol, sportista.ime, sportista.prezime, sportista.nacionalnost).subscribe(resp=>{
                    if(resp["message"] != "ok") {
                      alert("Greska pri dodavanju finaliste!");
                    }
                  })
              }
            })
          } else {
            alert("Greska pri kreiranju finalne grupe!");
          }
        })
    //    alert("Sportisti uspesno dodati!");
    localStorage.removeItem('grupaSDP');
    this.ruter.navigate(['/delegat']);
  }

  nazad() {
    localStorage.removeItem('grupaSDP');
    this.ruter.navigate(['/delegat']);
  }

}


// this.delegat = JSON.parse(localStorage.getItem('ulogovan'));