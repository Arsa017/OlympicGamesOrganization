import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../models/sport';
import { OrganizatorService } from '../organizator.service';

@Component({
  selector: 'app-lista-sportova',
  templateUrl: './lista-sportova.component.html',
  styleUrls: ['./lista-sportova.component.css']
})
export class ListaSportovaComponent implements OnInit {

  constructor(private ruter: Router, private organizatorService: OrganizatorService) { }

  ngOnInit(): void {
    this.organizatorService.dohvatiSportove().subscribe((podaci:Sport[])=>{
      this.sportovi = podaci;
    })
  }

  sportovi: Sport[];

  nazad() {
    this.ruter.navigate(['/organizator']);
  }
}
