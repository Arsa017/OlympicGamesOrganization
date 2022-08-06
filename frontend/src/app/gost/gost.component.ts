import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  pocetna() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }

}
