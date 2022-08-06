import express, { Response } from 'express'
import Sportista from '../models/sportista'

export class SportistaController {

    unesiSportistu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let nazivSporta = req.body.nazivSporta;
        let disciplina = req.body.disciplina;
        let nacionalnost = req.body.nacionalnost;
        let osvajacMedalje = req.body.osvajacMedalje;

        Sportista.findOne({
            "ime": ime, "prezime": prezime, "pol": pol, "nacionalnost": nacionalnost
        }, (err, sportista) => {
            if (err) console.log(err);
            else {
                if (sportista) {
                    // znaci da sportista vec postoji u bazu pa mu samo u niz disciplina treba dodati novu disciplinu
                    let disciplinaObj = {
                        disciplina: disciplina  // u niz pusujemo objekat koji ima polje sa nazivom
                    }
                    Sportista.collection.updateOne({
                        "ime": ime, "prezime": prezime, "pol": pol, "nacionalnost": nacionalnost,
                        "nazivSporta": nazivSporta
                    }, { $push: { "discipline": disciplinaObj } });
                    res.status(200).json({ "message": "ok" });
                } else {
                    // sportista ne postoji u bazi pa ga dodajemo kao novi element
                    let sportista = new Sportista();
                    let disciplinaObj = {
                        disciplina: disciplina
                    };
                    sportista.set(
                        {
                            "ime": ime, "prezime": prezime, "pol": pol, "nazivSporta": nazivSporta,
                            "discipline": disciplinaObj, "nacionalnost": nacionalnost,
                            "osvajacMedalje": osvajacMedalje
                        }
                    );
                    sportista.save().then(sportista => {
                        res.status(200).json({ "message": "ok" });
                    }).catch(err => {
                        res.status(400).json(err);
                    });

                }
            }
        })

    }


    dohvatiSportistuZaSportIDisciplinu = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;
        let nacionalnost = req.body.nacionalnost;

        Sportista.findOne({
            "nazivSporta": nazivSporta, "discipline.disciplina": nazivDiscipline,
            "pol": pol, "nacionalnost": nacionalnost
        }, (err, sportista) => {
            if (err) console.log(err);
            //    console.log("prolazi");
            if (sportista) {
                //    console.log("Nasao sam sportistu koji je vec uzeo tu disciplinu");
                res.json({ "message": "OK" }); // onda je ta disciplina vec zauzeta
            } else {
                //    console.log("Nisam nasao sportistu koji je vec uzeo tu disciplinu");
                res.json({ "message": "notOK" });
            }

        })
    }

    dohvatiSportistuPoImenuIPrezimenu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let nacionalnost = req.body.nacionalnost;

        Sportista.findOne({
            "ime": ime, "prezime": prezime,
            "pol": pol, "nacionalnost": nacionalnost
        }, (err, sportista) => {
            if (err) console.log(err);
            else {
                res.json(sportista);
            }
        })

    }

    dohvatiSportisteIstogPolaZaSportIDisciplinu = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        Sportista.find({
            "nazivSporta": nazivSporta, "discipline.disciplina": nazivDiscipline,
            "pol": pol
        }, (err, sportisti) => {
            if (err) console.log(err);
            else {
                res.json(sportisti);
            }
        })
    }

    dohvatiSveSportiste = (req: express.Request, res: express.Response) => {
        Sportista.find({}, (err, podaci) => {
            if (err) console.log(err);
            else {
                res.json(podaci);
            }

        })
    }

    pretraziSportiste = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let nacionalnost = req.body.nacionalnost;
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;
        let osvajacMedalje = req.body.osvajacMedalje;

        Sportista.find({
            "ime": { $regex: ime }, "prezime": { $regex: prezime },
            "nacionalnost": { $regex: nacionalnost }, "nazivSporta": { $regex: nazivSporta },
            "discipline.disciplina": { $regex: nazivDiscipline }, "pol": { $regex: pol }, "osvajacMedalje": { $regex: osvajacMedalje }
        }, (err, podaci) => {
            if (err) console.log(err);
            else {
                res.json(podaci);
            }
        })
    }

    dodeliMedaljuSportisti = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let nacionalnost = req.body.nacionalnost;

    //    console.log(ime); console.log(prezime); console.log(nacionalnost);

        Sportista.collection.updateOne({
            "ime": ime, "prezime": prezime,
            "nacionalnost": nacionalnost
        }, { $set: { "osvajacMedalje": "true" } });

        res.json({ "message": "ok" });
    }

}
