import express from 'express'
import Sport from '../models/sport'

export class SportController {

    dodajSport = (req: express.Request, res: express.Response) => {
        let sport = new Sport(req.body);

        sport.save().then((sport) => {
            res.status(200).json({ "message": "ok" });
        }).catch(err => {
            res.status(400).json(err);
        })
    }

    dohvatiSportove = (req: express.Request, res: express.Response) => {
        Sport.find({}, (err, sportovi) => {
            if (err) console.log(err)
            else {
                res.json(sportovi);
            }
        })
    }

    dohvatiIndividualneSportove = (req: express.Request, res: express.Response) => {
        Sport.find({ "vrstaSporta": "individualni" }, (err, sportovi) => {
            if (err) console.log(err);
            else {
                res.json(sportovi);
            }
        })
    }

    dohvatiSport = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;

        Sport.findOne({ "nazivSporta": nazivSporta, "nazivDiscipline": nazivDiscipline }, (err, sport) => {
            if (err) console.log(err);
            else {
                res.json(sport);
            }
        })
    }

    registrujMuskiSport = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;

        Sport.collection.updateOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline
        }, { $set: { "registrovanM": true } });
        res.status(200).json({ "message": "ok" });
    }

    registrujZenskiSport = (req: express.Request, res: express.Response) => {
        let nazivSporta = req.body.nazivSporta;
        let nazivDiscipline = req.body.nazivDiscipline;

        Sport.collection.updateOne({
            "nazivSporta": nazivSporta,
            "nazivDiscipline": nazivDiscipline
        }, { $set: { "registrovanZ": true } });
        res.status(200).json({ "message": "ok" });
    }

    dohvatiRazliciteNaziveSportova = (req: express.Request, res: express.Response) => {
        Sport.find().distinct("nazivSporta", (err, sportovi)=>{
            if(err) console.log(err);
            else {
                res.json(sportovi);
            }
        })
    }

    dohvatiRazliciteDiscipline = (req: express.Request, res: express.Response) => {
        Sport.find().distinct("nazivDiscipline", (err, discipline)=>{
            if(err) console.log(err);
            else {
                res.json(discipline);
            }
        })
    }

}