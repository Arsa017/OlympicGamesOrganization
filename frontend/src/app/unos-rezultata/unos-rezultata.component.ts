import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelegatService } from '../delegat.service';
import { Grupa } from '../models/grupa';
import { Korisnik } from '../models/korisnik';
import { SportistaObject } from '../models/sportistaObject';

@Component({
  selector: 'app-unos-rezultata',
  templateUrl: './unos-rezultata.component.html',
  styleUrls: ['./unos-rezultata.component.css']
})
export class UnosRezultataComponent implements OnInit {

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


    this.finaleSDP = JSON.parse(localStorage.getItem('finaleSDP'));
    if(this.finaleSDP === null) {
      this.ruter.navigate(['/prijava']);
    } else {
      this.nazivSporta = this.finaleSDP.split('-')[0];
    this.nazivDiscipline = this.finaleSDP.split('-')[1];
    this.pol = this.finaleSDP.split('-')[2];

    this.delegatServis.dohvatiGrupu(this.nazivSporta, this.nazivDiscipline, this.pol).subscribe((data: Grupa) => {
      if (data) {
        this.grupa = data;
        let format = data.format;
        this.unosRezultata = format.split('-')[0];
        let tmpStr = format.split('-')[1];
        let tmpStr2 = tmpStr.split(':')[1];
        let brRundi = parseInt(tmpStr2);
        if (brRundi == 1) {
          this.vrstaTabele = 1;
        }
        if (brRundi == 3) {
          this.vrstaTabele = 3;
        }
        if (brRundi == 6) {
          this.vrstaTabele = 6;
        }
        // alert(this.vrstaTabele);
      }
    })
    }

  /*  this.nazivSporta = this.finaleSDP.split('-')[0];
    this.nazivDiscipline = this.finaleSDP.split('-')[1];
    this.pol = this.finaleSDP.split('-')[2];

    this.delegatServis.dohvatiGrupu(this.nazivSporta, this.nazivDiscipline, this.pol).subscribe((data: Grupa) => {
      if (data) {
        this.grupa = data;
        let format = data.format;
        this.unosRezultata = format.split('-')[0];
        let tmpStr = format.split('-')[1];
        let tmpStr2 = tmpStr.split(':')[1];
        let brRundi = parseInt(tmpStr2);
        if (brRundi == 1) {
          this.vrstaTabele = 1;
        }
        if (brRundi == 3) {
          this.vrstaTabele = 3;
        }
        if (brRundi == 6) {
          this.vrstaTabele = 6;
        }
        // alert(this.vrstaTabele);
      }
    }) */
  }

  korisnik: Korisnik = new Korisnik();

  tenis: string = "Tenis";

  unosRezultata: string = "";
  finaleSDP: string = "";
  nazivSporta: string = "";
  nazivDiscipline: string = "";
  pol: string = "";
  vrstaTabele: number = 0;
  flegNoviKrug: number = 0;

  sportistiNoviKrug: SportistaObject[] = [];



  grupa: Grupa;

  noviKrug() {

    if(this.nazivSporta == this.tenis) {
      alert("Nema novog kruga za tenis!");
      return;
    } 

    this.sportistiNoviKrug = [];
    this.flegNoviKrug = 1;

    this.grupa.finalisti.forEach((finalista: SportistaObject) => {
      if (finalista.novoKolo == true) {
        //    console.log(finalista);
        this.sportistiNoviKrug.push(finalista);
      }
    })


  }

  cntError: number = 0;
  cntZlato: number = 0;
  cntSrebro: number = 0;
  cntBronza: number = 0;
  viseMedalja: number = 0;

  dodeliMedalje() {

    if (this.vrstaTabele == 1) {

    //  alert("Vrsta tabele je 1");

      this.cntError = 0;
      this.cntZlato = 0;
      this.cntSrebro = 0;
      this.cntBronza = 0;
      this.viseMedalja = 0;
      this.grupa.finalisti.forEach((finalista: SportistaObject) => {
        if (finalista.rez1 === undefined || finalista.rez1 == "") {
          this.cntError++;
        }
        if ((finalista.zlato == true && finalista.srebro == true) || (finalista.zlato == true && finalista.bronza == true)
          || (finalista.srebro == true && finalista.bronza == true)) {
          this.viseMedalja++;
        }

        if(finalista.novoKolo == true && (finalista.rezNoviKrug === undefined || finalista.rezNoviKrug == "")) {
          this.cntError++;
        }

        if (finalista.zlato == true) {
          this.cntZlato++;
        }
        if (finalista.srebro == true) {
          this.cntSrebro++;
        }
        if (finalista.bronza == true) {
          this.cntBronza++;
        }
      })

      if (this.cntError > 0) {
        alert("Unesite sve rezultate pre dodele medalja!");
        //  alert(this.cntError);
        return;
      }

      if (this.cntZlato == 0 || this.cntSrebro == 0 || this.cntBronza == 0) {
        alert("Odaberite finaliste dobitnike medalja!");
        return;
      }

      if (this.viseMedalja > 0) {
        alert("Finalista ne moze imati vise od jedne medalje!");
        return;
      }

      if (this.cntZlato > 1) {
        alert("Ne mogu se dodeliti 2 zlatne medalje!");
        return;
      }

      if (this.cntSrebro > 1) {
        alert("Ne mogu se dodeliti 2 srebrne medalje!");
        return;
      }

      if (this.cntBronza > 1) {
        alert("Ne mogu se dodeliti 2 bronzane medalje!");
        return;
      }

      // dodelimo medalje; Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje

      // dodela zlatne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.zlato == true) {
          // Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje
          this.delegatServis.uvecajBrojZlatnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju zlatne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja zlatnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela srebrne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.srebro == true) {
          this.delegatServis.uvecajBrojSrebrnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju srebrne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja srebrnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela bronzane medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.bronza == true) {
          this.delegatServis.uvecajBrojBronzanihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju bronzane medalje finalisti!");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja bronzanih medalja drzavi!");
              return;
            }
          })
        }
      })

      // azuriramo grupu da su dodenjene medalje, ispisemo poruku o uspesnoj dodeli medalja i navigiramo se na delegata

      this.delegatServis.azurirajFlegMedaljeDodeljene(this.grupa.nazivSporta, this.grupa.nazivDiscipline,
        this.grupa.pol).subscribe(resp => {
          if(resp["message"] == "ok") {
            alert("Medalje uspesno dodeljene!");
            localStorage.removeItem('finaleSDP');
            this.ruter.navigate(['/delegat']);
          } else {
            alert("Greska pri dodeli medalja!");
          }
        })

    }

    if (this.vrstaTabele == 3) {

    //  alert("Vrsta tabele je 3");

      this.cntError = 0;
      this.cntZlato = 0;
      this.cntSrebro = 0;
      this.cntBronza = 0;
      this.viseMedalja = 0;
      this.grupa.finalisti.forEach((finalista: SportistaObject) => {
        if (finalista.rez1 === undefined || finalista.rez1 == "") {
          this.cntError++;
        }
        if (finalista.rez2 === undefined || finalista.rez2 == "") {
          this.cntError++;
        }
        if (finalista.rez3 === undefined || finalista.rez3 == "") {
          this.cntError++;
        }

        if(finalista.novoKolo == true && (finalista.rezNoviKrug === undefined || finalista.rezNoviKrug == "")) {
          this.cntError++;
        }

        if ((finalista.zlato == true && finalista.srebro == true) || (finalista.zlato == true && finalista.bronza == true)
          || (finalista.srebro == true && finalista.bronza == true)) {
          this.viseMedalja++;
        }

        if (finalista.zlato == true) {
          this.cntZlato++;
        }
        if (finalista.srebro == true) {
          this.cntSrebro++;
        }
        if (finalista.bronza == true) {
          this.cntBronza++;
        }
      })

      if (this.cntError > 0) {
        alert("Unesite sve rezultate pre dodele medalja!");
        //  alert(this.cntError);
        return;
      }

      if (this.cntZlato == 0 || this.cntSrebro == 0 || this.cntBronza == 0) {
        alert("Odaberite finaliste dobitnike medalja!");
        return;
      }

      if (this.viseMedalja > 0) {
        alert("Finalista ne moze imati vise od jedne medalje!");
        return;
      }

      if (this.cntZlato > 1) {
        alert("Ne mogu se dodeliti 2 zlatne medalje!");
        return;
      }

      if (this.cntSrebro > 1) {
        alert("Ne mogu se dodeliti 2 srebrne medalje!");
        return;
      }

      if (this.cntBronza > 1) {
        alert("Ne mogu se dodeliti 2 bronzane medalje!");
        return;
      }

      // dodelimo medalje; Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje

      // dodela zlatne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.zlato == true) {
          // Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje
          this.delegatServis.uvecajBrojZlatnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju zlatne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja zlatnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela srebrne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.srebro == true) {
          this.delegatServis.uvecajBrojSrebrnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju srebrne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja srebrnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela bronzane medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.bronza == true) {
          this.delegatServis.uvecajBrojBronzanihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju bronzane medalje finalisti!");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja bronzanih medalja drzavi!");
              return;
            }
          })
        }
      })

      this.delegatServis.azurirajFlegMedaljeDodeljene(this.grupa.nazivSporta, this.grupa.nazivDiscipline,
        this.grupa.pol).subscribe(resp => {
          if(resp["message"] == "ok") {
            alert("Medalje uspesno dodeljene!");
            localStorage.removeItem('finaleSDP');
            this.ruter.navigate(['/delegat']);
          } else {
            alert("Greska pri dodeli medalja!");
          }
        })

    }

    if (this.vrstaTabele == 6) {

    // alert("Vrsta tabele je 6");

      this.cntError = 0;
      this.cntZlato = 0;
      this.cntSrebro = 0;
      this.cntBronza = 0;
      this.viseMedalja = 0;
      this.grupa.finalisti.forEach((finalista: SportistaObject) => {
        if (finalista.rez1 === undefined || finalista.rez1 == "") {
          this.cntError++;
        }
        if (finalista.rez2 === undefined || finalista.rez2 == "") {
          this.cntError++;
        }
        if (finalista.rez3 === undefined || finalista.rez3 == "") {
          this.cntError++;
        }
        if (finalista.rez4 === undefined || finalista.rez4 == "") {
          this.cntError++;
        }
        if (finalista.rez5 === undefined || finalista.rez5 == "") {
          this.cntError++;
        }
        if (finalista.rez6 === undefined || finalista.rez6 == "") {
          this.cntError++;
        }

        if ((finalista.zlato == true && finalista.srebro == true) || (finalista.zlato == true && finalista.bronza == true)
          || (finalista.srebro == true && finalista.bronza == true)) {
          this.viseMedalja++;
        }

        if(finalista.novoKolo == true && (finalista.rezNoviKrug === undefined || finalista.rezNoviKrug == "")) {
          this.cntError++;
        }

        if (finalista.zlato == true) {
          this.cntZlato++;
        }
        if (finalista.srebro == true) {
          this.cntSrebro++;
        }
        if (finalista.bronza == true) {
          this.cntBronza++;
        }
      })

      if (this.cntError > 0) {
        alert("Unesite sve rezultate pre dodele medalja!");
        //  alert(this.cntError);
        return;
      }

      if (this.cntZlato == 0 || this.cntSrebro == 0 || this.cntBronza == 0) {
        alert("Odaberite finaliste dobitnike medalja!");
        return;
      }

      if (this.viseMedalja > 0) {
        alert("Finalista ne moze imati vise od jedne medalje!");
        return;
      }

      if (this.cntZlato > 1) {
        alert("Ne mogu se dodeliti 2 zlatne medalje!");
        return;
      }

      if (this.cntSrebro > 1) {
        alert("Ne mogu se dodeliti 2 srebrne medalje!");
        return;
      }

      if (this.cntBronza > 1) {
        alert("Ne mogu se dodeliti 2 bronzane medalje!");
        return;
      }

      // dodelimo medalje; Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje

      // dodela zlatne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.zlato == true) {
          // Uvecamo broj zlatnih medalja i azuriramo finalistu da je dobitnik medalje
          this.delegatServis.uvecajBrojZlatnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju zlatne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja zlatnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela srebrne medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.srebro == true) {
          this.delegatServis.uvecajBrojSrebrnihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju srebrne medalje finalisti");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja srebrnih medalja drzavi!");
              return;
            }
          })
        }
      })

      // dodela bronzane medalje
      this.grupa.finalisti.forEach(finalista => {
        if (finalista.bronza == true) {
          this.delegatServis.uvecajBrojBronzanihMedalja(finalista.nacionalnost).subscribe(resp => {
            if (resp["message"] == "ok") {
              this.delegatServis.dodeliMedaljuSportisti(finalista.ime, finalista.prezime, finalista.nacionalnost).subscribe(resp => {
                if (resp["message"] != "ok") {
                  alert("Greska pri dodavanju bronzane medalje finalisti!");
                  return;
                }
              })
            } else {
              alert("Greska pri uvecavanju broja bronzanih medalja drzavi!");
              return;
            }
          })
        }
      })

      this.delegatServis.azurirajFlegMedaljeDodeljene(this.grupa.nazivSporta, this.grupa.nazivDiscipline,
        this.grupa.pol).subscribe(resp => {
          if(resp["message"] == "ok") {
            alert("Medalje uspesno dodeljene!");
            localStorage.removeItem('finaleSDP');
            this.ruter.navigate(['/delegat']);
          } else {
            alert("Greska pri dodeli medalja!");
          }
        })

    }



    // pre povratka oznaciti da su za posmatranu finalnu grupu dodeljene medalje

 //   alert("nastavak dalje");
    
  }


  nazad() {
    localStorage.removeItem('finaleSDP');
    this.ruter.navigate(['/delegat']);
  }

}



