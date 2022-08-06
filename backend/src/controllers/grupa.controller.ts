import express from 'express';
import Grupa from '../models/grupa';

export class GrupaContoller {

    kreirajGrupu = (req: express.Request, res: express.Response) => {
        let grupa = new Grupa(req.body);

        grupa.save().then(grupa => {
            res.status(200).json(grupa);
        }).catch(err => {
            res.status(400).json(err);
        })
    }

    dodajFinalistu = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let nacionalnost = req.body.nacionalnost;

        let finalistaObj = {
            ime: ime,
            prezime: prezime,
            nacionalnost: nacionalnost
        }

        Grupa.collection.updateOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline, "pol": pol
        }, { $push: { "finalisti": finalistaObj } });
        res.status(200).json({ "message": "ok" });

    }

    dohvatiGrupu = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        Grupa.findOne({
            "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline,
            "pol": pol
        }, (err, grupa) => {
            if (err) console.log(err);
            else {
                res.json(grupa);
            }
        })
    }

    dohvatiFinalneGrupeBezUnesenihRezultata = (req: express.Request, res: express.Response) => {
        Grupa.find({ "medaljeDodeljene": false }, (err, grupe) => {
            if (err) console.log(err);
            else {
                res.json(grupe);
            }
        })
    }

    azurirajFlegMedaljeDodeljene = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;
        let pol = req.body.pol;

        Grupa.collection.updateOne({
            "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline,
            "pol": pol
        }, { $set: { "medaljeDodeljene": true } });
        res.status(200).json({ "message": "ok" });
    }

}