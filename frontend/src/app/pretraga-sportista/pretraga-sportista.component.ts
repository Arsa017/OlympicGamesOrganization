import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GostService } from '../gost.service';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pretraga-sportista',
  templateUrl: './pretraga-sportista.component.html',
  styleUrls: ['./pretraga-sportista.component.css']
})
export class PretragaSportistaComponent implements OnInit {

  constructor(private ruter: Router, private zemljaService: ZemljaService,
    private gostService: GostService) { }

  ngOnInit(): void {
    this.zemljaService.dohvatiSveZemlje().subscribe((podaci: Zemlja[]) => {
      this.sveZemlje = podaci;
    })
    this.gostService.dohvatiRazliciteNaziveSportova().subscribe((podaci: string[]) => {
      this.razlicitiSportovi = podaci;
    })
    this.gostService.dohvatiRazliciteDiscipline().subscribe((podaci: string[]) => {
      this.razliciteDiscipline = podaci;
      this.razliciteDiscipline.shift();
    })
    this.gostService.dohvatiSveSportiste().subscribe((data: Sportista[]) => {
      this.ukupnoSportista = data.length;
    })
  }

  imeIprezime: string = "";
  ime: string = "";
  prezime: string = "";
  nazivZemlje: string = "";
  nazivSporta: string = "";
  nazivDiscipline: string = "";
  pol: string = "";
  flegOsvajacMedalje: boolean;
  osvajacMedalje: string = "";

  sveZemlje: Zemlja[];
  razlicitiSportovi: string[];
  razliciteDiscipline: string[];

  sportisti: Sportista[];
  tmpNiz: string[];

  pretrazi() {
    if(this.flegOsvajacMedalje == true) {
      this.osvajacMedalje = "true";
    }
    
    this.ime = this.imeIprezime.split(' ')[0];
    this.prezime = this.imeIprezime.split(' ')[1];
    this.tmpNiz = this.imeIprezime.split(' ');
    if (this.imeIprezime == "" || this.tmpNiz.length == 1) {
      this.prezime = "";
    }

    if (this.imeIprezime == "" && this.nazivZemlje == "" && this.nazivSporta == ""
      && this.nazivDiscipline == "" && this.pol == "" && this.osvajacMedalje == "") {
       // alert("ulazi!");
      this.gostService.dohvatiSveSportiste().subscribe((data: Sportista[]) => {
        if (data) {
          this.ukupnoSportista = data.length;
          this.sportisti = data;
          this.nizSportista = this.sportisti.slice((this.sportistiPoStranici * (this.trenutnaStranica - 1)),
            ((this.sportistiPoStranici * (this.trenutnaStranica - 1)) + this.sportistiPoStranici));
        }
      })
      return;
    }

    if (this.ime != "" || this.prezime != "" || this.nazivZemlje != "" || this.nazivSporta != "" || this.nazivDiscipline != "" 
      || this.pol != "" || this.osvajacMedalje != "") {
      this.gostService.pretraziSportiste(this.ime, this.prezime, this.nazivZemlje,
        this.nazivSporta, this.nazivDiscipline, this.pol, this.osvajacMedalje).subscribe((data: Sportista[]) => {
          // this.sportisti = data;
          if (data) {
            if (data.length == 0) {
              alert("Sportista nije pronadjen!");
              return;
            }
            this.ukupnoSportista = data.length;
            this.sportisti = data;
            this.nizSportista = this.sportisti.slice((this.sportistiPoStranici * (this.trenutnaStranica - 1)),
              ((this.sportistiPoStranici * (this.trenutnaStranica - 1)) + this.sportistiPoStranici));
            //  console.log(data);
          } else {
            alert("Sportista nije pronadjen!");
          }
        })
    }
    this.osvajacMedalje = "";
  }

  nizSportista: Sportista[];
  ukupnoSportista: number;
  sportistiPoStranici: number = 10;
  trenutnaStranica: number = 1;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  onChangedPage(pageData: PageEvent) {
    this.trenutnaStranica = pageData.pageIndex + 1;
    this.sportistiPoStranici = pageData.pageSize;

    if (this.sportistiPoStranici && this.trenutnaStranica) {
      this.nizSportista = this.sportisti.slice((this.sportistiPoStranici * (this.trenutnaStranica - 1)),
        ((this.sportistiPoStranici * (this.trenutnaStranica - 1)) + this.sportistiPoStranici));
    }
  }

  nazad() {
    this.ruter.navigate(['/gost']);
  }

}
