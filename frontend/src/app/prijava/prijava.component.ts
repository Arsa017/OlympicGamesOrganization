import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../prijava.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  hide = true;

  constructor(private prijavaService: PrijavaService,
    private ruter: Router, private zemljaServis: ZemljaService) { }

  ngOnInit(): void {
  }

  // prijava
  korisnickoIme: string = "";
  lozinka: string = "";
  errorMessage: string = "";


  // registracija
  kor_ime: string = "";
  lozinkaReg: string = "";
  potvrdaLozinke: string = "";
  ime: string = "";
  prezime: string = "";
  nacionalnost: string = "";
  email: string = "";
  tip: string = "";
  regPoruka: string = "";

  brZlatnihMedalja: number = 0;
  brSrebrnihMedalja: number = 0;
  brBronzanihMedalja: number = 0;
  ukBrMedalja: number = 0;
  ukBrSportista: number = 0;

  registracija(form: NgForm) {

    if(form.invalid) {
      alert("Unesite validne podatke!");
      return;
    }

    this.kor_ime = form.value.kor_ime;
    this.lozinkaReg = form.value.lozinkaReg;
    this.potvrdaLozinke = form.value.potvrdaLozinke;
    this.ime = form.value.ime;
    this.prezime = form.value.prezime;
    this.nacionalnost = form.value.nacionalnost;
    this.email = form.value.email;
    this.tip = form.value.tip; 

  /*  alert(this.kor_ime);
    alert(this.lozinkaReg);
    alert(this.potvrdaLozinke);
    alert(this.ime); alert(this.prezime); alert(this.nacionalnost); alert(this.email); alert(this.tip); */

    if (this.kor_ime == "" || this.lozinkaReg == "" || this.potvrdaLozinke == "" || this.ime == "" || this.prezime == ""
      || this.nacionalnost == "" || this.email == "" || this.tip == "") {
      this.regPoruka = "Unesite sve podatke";
      //    this.kor_ime ==""; this.lozinkaReg ==""; this.potvrdaLozinke==""; this.ime =="";
      //    this.prezime==""; this.nacionalnost == ""; this.email==""; this.tip=="";
      return;
    }

    if (this.lozinkaReg != this.potvrdaLozinke) {
      this.regPoruka = "Lozinke se ne poklapaju";
      return;
    }

    this.prijavaService.dohvatiKorisnika(this.kor_ime).subscribe((kor: Korisnik) => {
      if (kor) {
        alert("Korisnicko ime zauzeto!");
        return;
      } else {

        if (this.tip == "organizator") {

          this.prijavaService.dohvatiOrganizatora().subscribe((kor: Korisnik) => {
            if (kor) {
              alert("Organizator postoji!");
              return;
            } else {
              this.prijavaService.registracija(this.kor_ime, this.lozinkaReg, this.ime, this.prezime,
                this.nacionalnost, this.email, this.tip, true).subscribe(response => {
                  if (response['message'] == 'user added') {
                    alert("Dodat organizator");
                  } else {
                    alert("Greska pri dodavanju organizatora");
                  }
                })

            }
          })

        }

        if (this.tip == "delegat") {

          this.prijavaService.registracija(this.kor_ime, this.lozinkaReg, this.ime, this.prezime,
            this.nacionalnost, this.email, this.tip, false).subscribe(response => {
              if (response['message'] == "user added") {
                alert("Korisnicki zahtev kreiran!");
                this.kor_ime == ""; this.lozinkaReg == ""; this.potvrdaLozinke == ""; this.ime == "";
                this.prezime == ""; this.nacionalnost == ""; this.email == ""; this.tip == "";
              } else {
                alert("Greska pri dodavanju korisnika");
              }
            })
        }

        if (this.tip == "vodja") {

          this.prijavaService.dohvatiVodjuNacije(this.nacionalnost).subscribe((kor: Korisnik) => {
            if (kor) {
              alert("Vodja delegacije za izabranu zemlju vec postoji!");
              return;
            } else {
              this.prijavaService.registracija(this.kor_ime, this.lozinkaReg, this.ime, this.prezime,
                this.nacionalnost, this.email, this.tip, false).subscribe(response => {
                  if (response['message'] == "user added") {
                    // posto se registruje vodja nacionalne delegacije; ujedno dodajemo objekat te Zemlje u kolekciju zemlje
                    this.zemljaServis.dodajZemlju(this.nacionalnost, this.brZlatnihMedalja, this.brSrebrnihMedalja,
                      this.brBronzanihMedalja, this.ukBrMedalja, this.ukBrSportista).subscribe(resp => {
                        if (resp["message"] != "ok") {
                          alert("Greska pri dodavanju zemlje u bazu!");
                          return;
                        }
                      })
                    alert("Korisnicki zahtev kreiran!");
                    this.kor_ime == ""; this.lozinkaReg == ""; this.potvrdaLozinke == ""; this.ime == "";
                    this.prezime == ""; this.nacionalnost == ""; this.email == ""; this.tip == "";
                  } else {
                    alert("Greska pri dodavanju korisnika!");
                  }
                })
            }
          })
        }

      }



    })

    //   alert("Ulazi");
  }

  prijava() { // dopuniti prijavu na sistem
    if (this.korisnickoIme == "" && this.lozinka == "") {
      this.errorMessage = "Unesite korisnicko ime i lozinku";
      return;
    }

    if (this.korisnickoIme == "") {
      this.errorMessage = "Unesite korisnicko ime";
      return;
    }

    if (this.lozinka == "") {
      this.errorMessage = "Unesite lozinku";
      return;
    }

    this.prijavaService.prijava(this.korisnickoIme, this.lozinka).subscribe((kor: Korisnik) => {

      if (kor) {
        if (kor.registrovan == true) {
          localStorage.setItem('ulogovan', JSON.stringify(kor));
          if (kor.tip == "organizator") {
            this.ruter.navigate(['organizator'])
          }
          if (kor.tip == "delegat") {
            this.ruter.navigate(['delegat']);
          }
          if (kor.tip == "vodja") {
            this.ruter.navigate(['vodja-delegacije']);
          }
        } else {
          alert("Ceka se odobrenje zahteva za registraciju!");
        }
      } else {
        this.errorMessage = "Nepostojeci korisnik";
        this.korisnickoIme = "";
        this.lozinka = "";
      }
    })
  }

  //greskaPromenaLozinke: string = "";
  korIme: string = "";
  staraLozinka: string = "";
  novaLozinka: string = "";

  promenaLozinke(form: NgForm) {

    if(form.invalid) {
      alert("Unesite validne podatke!");
      return;
    }

    this.korIme = form.value.korIme;
    this.staraLozinka = form.value.staraLozinka;
    this.novaLozinka = form.value.novaLozinka;

    // pokusamo da dohvatimo korisnika sa zadatim korisnickim imenom i lozinkom
    this.prijavaService.dohvatiKorisnikaUP(this.korIme, 
      this.staraLozinka).subscribe((user: Korisnik)=> {
        if(user) {
          if(user.lozinka == this.novaLozinka) {
            alert("Greska! Nova i stara lozinka su iste!"); 
            //form.reset(form.value.novaLozinka);
            return;
          }
          // radimo promenu lozinke
          this.prijavaService.promeniLozinkuKorisniku(user.kor_ime, user.lozinka, this.novaLozinka).subscribe(resp => {
            if(resp["message"] == "ok") {
              alert("Lozinka uspesno promenjena!");
              this.ruter.navigate(['/prijava']);
              //return;
            } else {
              alert("Greska pri promeni lozinke!");
              return;
            }
          })
        } else {
          alert("Greska! Nepostojeci korisnik!");
          form.reset(form.value.korIme);
          form.reset(form.value.staraLozinka);
          form.reset(form.value.novaLozinka);
          return;
        }
      })


  }

  //  this.kor_ime = form.value.kor_ime;

  pocetna() {
    this.ruter.navigate(['']);
  }

}


