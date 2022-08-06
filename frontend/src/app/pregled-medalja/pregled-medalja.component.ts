import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pregled-medalja',
  templateUrl: './pregled-medalja.component.html',
  styleUrls: ['./pregled-medalja.component.css']
})
export class PregledMedaljaComponent implements OnInit {

  constructor(private ruter: Router, private zemljaServis: ZemljaService) {
  }

  ngOnInit(): void {
  
    this.zemljaServis.dohvatiZemljeSortiranePoMedaljama().subscribe((podaci: Zemlja[]) => {
      if (podaci) {
        this.sveZemlje = podaci;
        this.nizZemlje =  this.sveZemlje.slice((this.drzavePoStranici*(this.trenutnaStranica-1)),
      ((this.drzavePoStranici*(this.trenutnaStranica-1))+this.drzavePoStranici));
      } else {
        alert("Greska pri dodavanju podataka!");
      }
    })
    this.zemljaServis.dohvatiSveZemlje().subscribe((podaci: Zemlja[])=>{
      this.totalDrzave = podaci.length;
    })


  }

  sveZemlje: Zemlja[];
  nizZemlje: Zemlja[];
  totalDrzave: number;
  drzavePoStranici: number = 10;
  trenutnaStranica: number = 1;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  onChangedPage(pageData: PageEvent) {
    this.trenutnaStranica = pageData.pageIndex + 1;
    this.drzavePoStranici = pageData.pageSize;

    if(this.drzavePoStranici && this.trenutnaStranica) {
      this.nizZemlje =  this.sveZemlje.slice((this.drzavePoStranici*(this.trenutnaStranica-1)),
      ((this.drzavePoStranici*(this.trenutnaStranica-1))+this.drzavePoStranici))
    }

  }


  nazad() {
    this.ruter.navigate(['/gost']);
  }

}
