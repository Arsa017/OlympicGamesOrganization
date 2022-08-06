import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
//import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pregled-zemalja',
  templateUrl: './pregled-zemalja.component.html',
  styleUrls: ['./pregled-zemalja.component.css']
})
export class PregledZemaljaComponent implements OnInit {

  constructor(private ruter: Router, private zemljaServis: ZemljaService) { }

  ngOnInit(): void {
    this.zemljaServis.dohvatiZemlje(this.drzavePoStranici, this.trenutnaStranica).subscribe((data: Zemlja[]) => {
      this.zemlje = data;
    })
    this.zemljaServis.dohvatiSveZemlje().subscribe((podaci: Zemlja[])=>{
      this.totalDrzave = podaci.length;
    })
  }

  nazad() {
    this.ruter.navigate(['/gost']);
  }

  zemlje: Zemlja[];

  totalDrzave: number;
  drzavePoStranici: number = 10;
  trenutnaStranica: number = 1;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  onChangedPage(pageData: PageEvent) {
    this.trenutnaStranica = pageData.pageIndex + 1;
    this.drzavePoStranici = pageData.pageSize;

    this.zemljaServis.dohvatiZemlje(this.drzavePoStranici, this.trenutnaStranica).subscribe((data: Zemlja[]) => {
      this.zemlje = data;
    })
  }

}
