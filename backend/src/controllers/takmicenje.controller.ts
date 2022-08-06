import express from 'express';
import Takmicenje from '../models/takmicenje';

export class TakmicenjeController {

    kreirajTakmicenje = (req: express.Request, res: express.Response) => {
        let takmicenje = new Takmicenje(req.body);

        takmicenje.save().then(takmicenje => {
            res.json({ "message": "ok" });
        }).catch(err => {
            res.json(err);
        })
    }

    dohvatiTakmicenjeZaDisciplinuIPol = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        Takmicenje.findOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline, "pol": pol
        }, (err, takmicenje) => {
            if (err) console.log(err);
            else {
                res.json(takmicenje);
            }
        })

    }

    dohvatiTakmicenja = (req: express.Request, res: express.Response) => {
        Takmicenje.find({}, (err, takmicenje) => {
            if (err) console.log(err);
            else {
                res.json(takmicenje);
            }
        })
    }

    dohvatiTakmicenjaBezSportista = (req: express.Request, res: express.Response) => {
        Takmicenje.find({ "sportistiDodati": false }, (err, takmicenja) => {
            if (err) console.log(err);
            else {
                res.json(takmicenja);
            }
        })
    }

    dodajSportistuUTakmicenje = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let nacionalnost = req.body.nacionalnost;

        let sportistaObj = {
            ime: ime,
            prezime: prezime,
            nacionalnost: nacionalnost
        }

        Takmicenje.collection.updateOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline, "pol": pol
        }, { $push: { "sportisti": sportistaObj } });
        res.status(200).json({ "message": "ok" });
    }

    azurirajFlegSportistiDodati = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        Takmicenje.collection.updateOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline, "pol": pol
        }, { $set: { "sportistiDodati": true } });
        res.status(200).json({ "message": "ok" });
    }

    dodajDelegata = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        let delegatObj = {
            kor_ime: kor_ime
        }

        Takmicenje.collection.updateOne({
            "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline,
            "pol": pol
        }, { $push: { "delegati": delegatObj } });
        res.status(200).json({ "message": "ok" });
    }

    dohvatiDelegataZaTakmicenje = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;
        let kor_ime = req.body.kor_ime;

        Takmicenje.findOne({
            "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline,
            "pol": pol, "delegati.kor_ime": kor_ime
        }, (err, delegat) => {
            if (err) console.log(err);
            else {
                res.json(delegat);
            }
        })

    }

    dohvatiTakmicenjaDelegata = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        Takmicenje.find({ "delegati.kor_ime": kor_ime }, (err, takmicenja) => {
            if (err) console.log(err);
            else {
                res.json(takmicenja);
            }
        })
    }

    dohvatiTakmicenjaDelegataBezDatumaFinala = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        Takmicenje.find({ "delegati.kor_ime": kor_ime, "tacanDatum": "", "satnica": "" }, (err, takmicenja) => {
            if (err) console.log(err);
            else {
                res.json(takmicenja);
            }
        })
    }

    dohvatiTakmicenjeZaLokacijuDatumISatnicu = (req: express.Request, res: express.Response) => {
        let tacanDatum = req.body.tacanDatum;
        let satnica = req.body.satnica;
        let lokacija = req.body.lokacija;

        Takmicenje.findOne({
            "tacanDatum": tacanDatum, "satnica": satnica,
            "lokacija": lokacija
        }, (err, takmicenje) => {
            if (err) console.log(err);
            else {
                res.json(takmicenje);
            }
        })
    }

    azurirajTacanDatumISatnicuTakmicenja = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;
        let tacanDatum = req.body.tacanDatum;
        let satnica = req.body.satnica;

        Takmicenje.collection.updateOne({
            "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline,
            "pol": pol
        }, { $set: { "tacanDatum": tacanDatum, "satnica": satnica } });
        res.status(200).json({ "message": "ok" });
    }

}